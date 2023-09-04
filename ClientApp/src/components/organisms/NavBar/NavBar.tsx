import React from "react";
import styled from "styled-components/macro";
import * as bootstrap from 'bootstrap';
import { NavLink as BaseNavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AppRoutes } from "src/AppRoutes";
import { ConfirmationModal } from "../ConfirmationModal";

interface IProps { }

const toggleMenu = () => {
  const btn = document.getElementById('navbar_links_toggle_button');
  if (btn === null || window.getComputedStyle(btn).display === "none") {
    return;
  }

  const el = document.getElementById('navbar_links');
  const collapse = new bootstrap.Collapse(el as Element);
  collapse.toggle();
}

const Nav = styled.div`
  width: 100%;
  padding: 0 8px;
  margin-bottom: 16px;

  .nav-link {
    cursor: pointer;
    color: ${p => p.theme.palette.primary.main};
    margin-left: 4px;
    margin-right: 4px;

    &:hover {
      border-bottom: 4px solid ${p => p.theme.palette.primary.main};
    }
  }

  .nav-link.is-active {
    border-bottom: 4px solid ${p => p.theme.palette.accent.main};
  }

  // collapsed menu styles
  @media (max-width: ${p => p.theme.breakpointPixels.lg}) {
    .navbar-nav {
      border-bottom: 4px solid ${p => p.theme.palette.grey};
      border-top: 4px solid ${p => p.theme.palette.grey};
      background-color: ${p => p.theme.palette.light};
    }

    .nav-link {
      padding-left: 8px;
      margin-left: 0;
      margin-right: 0;
    }

    .nav-link.is-active {
      border-bottom: none;
      border-left: 4px solid ${p => p.theme.palette.accent.main};
      padding-left: 4px;
      background-color: ${p => p.theme.palette.greyLight}
    }
  }
`;

const NavLink: React.FC<{ to: string, text: string }> = (props): JSX.Element => {

  return (
    <BaseNavLink
      to={props.to}
      onClick={() => toggleMenu()}
      className={({ isActive }) =>
        isActive ? 'nav-link is-active' : 'nav-link'
      }
    >
      {props.text}
    </BaseNavLink>
  );
}

export const NavBar: React.FC<IProps> = (props): JSX.Element => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const nav = useNavigate();

  return (
    <>
      <Nav className="navbar navbar-expand-lg" role="banner">
        <BaseNavLink to={AppRoutes.home} className="navbar-brand">
          <img src="/assets/logo.png" alt="Christie Logo" height="64" />
        </BaseNavLink>
        <button id="navbar_links_toggle_button" className="navbar-toggler" type="button" onClick={() => toggleMenu()}>
          <FontAwesomeIcon icon={faBars} fixedWidth />
        </button>
        <div className="collapse navbar-collapse" id="navbar_links">
          <div className="navbar-nav">
            <NavLink to={AppRoutes.home} text="Home" />
            <NavLink to={AppRoutes.forms} text="My Forms" />
            <NavLink to={AppRoutes.myDetails} text="My Details" />
            <NavLink to={AppRoutes.help} text="Help" />
            <a className="nav-link" onClick={() => setShowModal(true)}>Sign out</a>
          </div>
        </div>
      </Nav>

      <ConfirmationModal
        show={showModal}
        question="Are you sure you want to sign out?"
        okButtonText="Sign out"
        cancelButtonText="Stay signed in"
        onOK={() => nav(AppRoutes.logout)}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}
