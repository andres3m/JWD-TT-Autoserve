import prisma from "@/database";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {    
    const vehicle = await prisma.vehicle.findFirstOrThrow({
      where: { id: Number(params.id) },
    });

    return new Response(JSON.stringify(vehicle), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Error handling
    if (error) {
      return new Response(JSON.stringify({ error: "Vehicle not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Other unhandled errors, return a 400
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
