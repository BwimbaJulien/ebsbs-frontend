import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export default function NavBar() {
    const pathName = window.location.pathname;
    console.log(pathName);

    return (
        <header className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 sm:py-12 lg:px-8">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl flex items-center gap-2">
                            <img src="/drc-flag.png" alt="logo" className="h-8 rounded-full w-auto sm:h-10" />
                            <span className="">
                                EBSBS
                            </span>
                        </h1>

                        <p className="mt-1.5 text-sm text-gray-500">
                            Electronic Blood Storage and Distribution System
                        </p>
                    </div>

                    <nav className="flex items-center gap-4">
                        <Button variant={"link"}>
                            <NavLink
                                to={"/"}
                                type="button"
                            >
                                Home
                            </NavLink>
                        </Button>
                        <Button variant={"link"}>
                            <NavLink
                                to={"/hauth/signin"}
                                type="button"
                            >
                                Hospital Login
                            </NavLink>
                        </Button>

                        <Button variant={"default"}>
                            <NavLink
                                to={"/bauth/signin"}
                                type="button"
                            >
                                Blood Bank
                            </NavLink>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
