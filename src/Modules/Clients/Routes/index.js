const Routes = [
    {
        name: "Clients",
        path: ["/clients"],
        elementPath: "List",
        prefix: "/admin",
        auth: true
    },
    {
        name: "New Clients",
        path: ["/clients/create"],
        elementPath: "Form",
        prefix: "/admin",
        auth: true
    },
    {
        name: "Show Clients",
        path: ["/clients/:id"],
        elementPath: "Show",
        prefix: "/admin",
        auth: true
    }
]   

export default Routes;