const Routes = [
  {
    name: "Publish Management",
    path: ["/publish-list"],
    elementPath: "List",
    prefix: "/admin",
    auth: true,
  },
  {
    name: "Create Publish",
    path: ["/publish/create"],
    elementPath: "Form",
    prefix: "/admin",
    auth: true,
  },
  {
    name: "Show Publish Statement",
    path: ["/publish/:id"],
    elementPath: "Show",
    prefix: "/admin",
    auth: true,
  },
];

export default Routes;
