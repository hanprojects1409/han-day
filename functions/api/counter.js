export async function onRequest(context) {
  const { request, env } = context;

  try {
    // GET = obtener los tres contadores
    if (request.method === "GET") {
      const result = await env.HAN_DAY_DB
        .prepare("SELECT activity, count FROM counters")
        .all();

      const counters = {
        songs: 0,
        stars: 0,
        postcards: 0
      };

      for (const row of result.results) {
        counters[row.activity] = row.count;
      }

      return Response.json(counters);
    }

    // POST = aumentar un contador
    if (request.method === "POST") {
      const body = await request.json();
      const activity = body.activity;

      const validActivities = ["songs", "stars", "postcards"];

      if (!validActivities.includes(activity)) {
        return Response.json(
          { error: "Invalid activity" },
          { status: 400 }
        );
      }

      await env.HAN_DAY_DB
        .prepare(
          "UPDATE counters SET count = count + 1 WHERE activity = ?"
        )
        .bind(activity)
        .run();

      const result = await env.HAN_DAY_DB
        .prepare("SELECT activity, count FROM counters")
        .all();

      const counters = {
        songs: 0,
        stars: 0,
        postcards: 0
      };

      for (const row of result.results) {
        counters[row.activity] = row.count;
      }

      return Response.json(counters);
    }

    return new Response("Method Not Allowed", {
      status: 405
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
