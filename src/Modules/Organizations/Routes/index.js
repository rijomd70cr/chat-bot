const Routes = [
    {
        name: "ReleaseManagement",
        path: ["/release-management"],
        elementPath: "List",
        prefix: "/admin",
        auth: true
    },
    {
        name: "New Release",
        path: ["/release-management/create"],
        elementPath: "New",
        prefix: "/admin",
        auth: true
    }
]

export default Routes;