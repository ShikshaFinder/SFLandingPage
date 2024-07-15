import { NextApiHandler } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
export const runtime = "experimental-edge";
const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query;

  if (code) {
    const supabase = createPagesServerClient({ req, res });
    await supabase.auth.exchangeCodeForSession(String(code));
  }

  res.redirect("/");
};

export default handler;
