import prisma from "@/database";

export async function GET() {
	try {
		const vehicles = await prisma.vehicle.findMany();
		return new Response(JSON.stringify(vehicles), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {		
		console.error("Error fetching vehicles:", error);
		return new Response(
			JSON.stringify({ error: "Failed to fetch vehicles" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
