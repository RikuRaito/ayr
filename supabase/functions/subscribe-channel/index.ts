import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { authenticateUser, corsHeaders } from "../_shared/auth.ts";

Deno.serve(async (req) => {
  const authResult = await authenticateUser(req);

  if (authResult instanceof Response) {
    return authResult;
  }
  const { user } = authResult;
  //管理者権限でのDB操作
  const adminClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const body = await req.json();
    const channelId = body.id;
    const userUuid = user.id;

    const { data: existing } = await adminClient
      .from("subscriptions")
      .select("id")
      .eq("uuid", userUuid)
      .eq("channel_id", channelId)
      .maybeSingle();
    if (existing) {
      return new Response(
        JSON.stringify({ message: "already subscribed this channel" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
    const { data, error: dbError } = await adminClient
      .from("subscriptions")
      .upsert(
        {
          uuid: userUuid,
          channel_id: channelId,
        },
        { onConflict: "uuid,channel_id" }
      )

      .select()
      .single();
    if (dbError) {
      console.error("Database Error:", dbError);
      throw new Error(`DB Error: ${dbError.message}`);
    }
    return new Response(JSON.stringify({ message: "チャンネルの登録に成功" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Internal Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
