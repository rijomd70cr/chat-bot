const Routes = [
    {
        name: "Dashboard",
        path: ["/dashboard"],
        elementPath: "Dashboard",
        prefix: "/admin",
        auth: true
    },
    {
        name: "Chat",
        path: ["/chat"],
        elementPath: "Chat",
        prefix: "/admin",
        auth: false
    }
]

export default Routes;