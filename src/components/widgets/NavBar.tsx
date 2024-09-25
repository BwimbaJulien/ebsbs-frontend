import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

export default function NavBar() {
    // const pathName = window.location.pathname;

    return (
        <header className="bg-background">
            <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 sm:py-12 lg:px-8">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <span className="text-2xl font-bold sm:text-3xl flex items-center gap-2">
                            <img src="https://cpts-nk.org/wp-content/uploads/2024/06/CPTS-NK-logo.png" alt="logo" className="h-20 w-auto" />
                            <span className="">C.P.T.S</span>
                        </span>

                        <p className="mt-1.5 text-sm">
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
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
