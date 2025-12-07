import { NextResponse } from "next/server";

import { resolveRuntimeConfigFromEnv } from "../../../../lib/runtime-config";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const config = resolveRuntimeConfigFromEnv();
  return NextResponse.json(config);
};


