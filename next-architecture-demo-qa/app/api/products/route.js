export function GET() {
    const products = [ // array with product objects
        { id: 1, name: "Keyboard", price: 25 },
        { id: 2, name: "Mouse", price: 15 },
        { id: 3, name: "Monitor", price: 120 },
        { id: 4, name: "Printer", price: 80 },
    ];

    return Response.json(products, { status: 200 }); // return as JSON response
}
