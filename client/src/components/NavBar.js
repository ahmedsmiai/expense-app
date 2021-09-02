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
        const { isAuth, logOut } = props
        if (isAuth) {
            return (
                <ButtonDropdown isOpen={dropDownOpen} toggle={toggleButton}>
                    <DropdownToggle caret size='sm'>
                        Welcome
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={()=>logOut()}>Logout</DropdownItem>
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
            <Navbar className='p-3' color="dark" dark expand="md">
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
    }
}
const NavBar = connect(mapStateToProps, { logOut })(NavBarComponent)
export { NavBar };