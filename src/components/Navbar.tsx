import { useContext } from "react";
import {
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarItem,
} from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setUserData, userData } =
    useContext(authContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(undefined);
    navigate("/signin");
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "font-bold text-primary" : "text-foreground";

  return (
    <HeroUiNavbar>
      <NavbarBrand>
        <Link to={"/"}>
          <p className="font-bold text-inherit">CIRCLE</p>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={userData?.name}
                size="sm"
                src={userData?.photo}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem textValue="profile" key="profile">
                <Link className="h-14" to="/profile">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userData?.name}</p>
                </Link>
              </DropdownItem>
              <DropdownItem
                textValue="logout"
                key="logout"
                color="danger"
                onPress={logout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <NavLink to="/signin" className={linkClass}>
                Sign In
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink to="/signup" className={linkClass}>
                Sign Up
              </NavLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </HeroUiNavbar>
  );
}
