import { lazy, Suspense  } from "react";
import {Modules} from "../../../Modules";
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { getConfig } from "../../Utilities";
import { isAuth } from "../Auth";
import { Backdrop, CircularProgress } from "@mui/material";

const PrivateRoute = ({auth, adminLayout = true, adminLayouts: AdminLayouts = "", redirectAuth, children, ...props}) => {

    if(auth) {
        if(!isAuth()) return <Navigate to={getConfig('UN_AUTH_REDIRECT')} />;
    }
    if(redirectAuth) {
        if(isAuth()) return <Navigate to={getConfig('AUTH_REDIRECT')} />;
    }

    if(isAuth()) {
        if(!adminLayout) {
            return <div>{children}</div>
        }
        if(AdminLayouts) {
            
            return <AdminLayouts {...props}>{children}</AdminLayouts>
        }
    }

    return children;
}

export const buildMenus = () => {

    let passMenus = [];
    let keys =  Object.keys(Modules);

    for (let i = 0; i < keys.length; i++) {
        const el = keys[i];
        for (let k = 0; k < Modules[el].Routes.length; k++) {
            const element = Modules[el].Routes[k];
            if(element?.menu) {
                passMenus.push({
                    name: element.name,
                    path: element.menu.path,
                });
            }
        }
    }

    return passMenus;
}

export default function GenerateRoutes(props) {

    const generateRouteModules = (moduleName, Element, value) => {
        const GeneratedElement = lazy(() => lazyRetry(() => import("../../../Modules/" + moduleName + "/Containers/" + Element)));
        let vl = {
            ...value,
            ...props
        }
        return <PrivateRoute {...vl}>
            <GeneratedElement {...value}/>
        </PrivateRoute>
    }

    const renderMultiRoutes = () => {
        return (
            <Suspense>
                <Routes>
                    {Object.keys(Modules).map((item, index) => {
                        return Modules[item].Routes.map((value, indexValue) => {
                            return value.path.map((v, i) => {
                                let vPath = v;
                                if(value.prefix) {
                                    vPath = value.prefix + v;
                                    window.app = {
                                        urlPrefix: value.prefix
                                    }
                                } 
                                if(value?.children?.length > 0) {
                                    return <Route key={i} path={vPath}>
                                        {value.children.map((child, i) => {
                                            return <Route key={i} path={child.path} element={generateRouteModules(item, child.elementPath, child)} />
                                        })}
                                    </Route>
                                }

                                return <Route key={i} path={vPath} element={generateRouteModules(item, value.elementPath, value)} />
                            })
                        })
                    })}
                    <Route path="*" element={<div>No page found</div>} />
                </Routes>
            </Suspense>
        )
    }

    return renderMultiRoutes()
}

const lazyRetry = function(componentImport) {
    return new Promise((resolve, reject) => {
        // try to import the component
        componentImport().then((component) => {
            resolve(component);
        }).catch((error) => {
            // TO DO
            reject(error); // there was an error
        });
    });
};