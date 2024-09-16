
.consumer-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #486aae;



  // width: 430px;
  // margin-top: 15px;


  .navbar {
    display: flex;
    justify-content: space-between;
    position: absolute;
    align-items: center;


    width: 400px;
    max-width: 100%;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .hamburger-button {
      background: none;
      border: none;
      cursor: pointer;

      img {
        width: 24px;
        height: 24px;
      }

      &:hover {
        opacity: 0.8;
      }
    }

    .company-details {
      display: flex;
      justify-content: center;
      flex-grow: 1;

      .company-logo {
        width: 40px;
        height: 40px;
      }
    }

    .profile-button {
      background: none;
      border: none;
      cursor: pointer;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }


  .profile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 180px;
    height: 100%;
    background-color: #ffffff;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 100;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;

    &.open {
      transform: translateX(0);
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        padding: 15px 0;
        cursor: pointer;

        img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }

        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }


  .sidebar-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 180px;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;

    &.open {
      transform: translateX(0);
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 15px;

      li {
        display: flex;
        align-items: center;
        padding: 10px 0;
        cursor: pointer;

        img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }

        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }


  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 90;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    &.open {
      display: block;
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    width: 400px;
    max-width: 100%;


  }

  @media(max-width: 375px){
    width: 375px;
    max-width: 100%;
  }

}
