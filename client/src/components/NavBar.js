import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { logOut } from '../actions'

const NavBarComponent = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);
    const toggleButton = () => setDropDownOpen(!dropDownOpen)

    function renderLoginorLogout() {
        const { isAuth, logOut, profile } = props
        if (isAuth) {
            return (
                <ButtonDropdown isOpen={dropDownOpen} toggle={toggleButton}>
                    <DropdownToggle caret size='sm'>
                        Welcome {profile.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => logOut()}>Logout</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            )
        }
        return (
            <NavItem>
                <NavLink href="/login">Login</NavLink>
            </NavItem>
        )

    }

    return (
        <div>
            <Navbar className='px-5 py-2'  color="dark" dark expand="md">
                <NavbarBrand href="/">MERN expense</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        {renderLoginorLogout()}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

const mapStateToProps = ({ auth }) => {
    return {
        isAuth: auth.isAuth,
        profile: auth.profile,

    }
}
const NavBar = connect(mapStateToProps, { logOut })(NavBarComponent)
export { NavBar };