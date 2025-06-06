import {
    AppstoreOutlined,
    ProductFilled,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import styles from './sidebar.module.scss';
  
  const Sidebar =()=> {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
  
    useEffect(() => {
      const pathName = location.pathname;
      setSelectedKeys(pathName);
    }, [location.pathname]);
  
    const navigate = useNavigate();
    return (
      <div className={styles['container']}>
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              label: "Dashbaord",
              icon: <AppstoreOutlined />,
              key: "/",
            },
            {
              label: "Category",
              key: "/category",
              icon: <ShopOutlined />,
            },
            {
                label:'Products',
                key:"/product",
                icon:<ProductFilled />
            },
            {
              label: "Orders",
              key: "/order",
              icon: <ShoppingCartOutlined />,
            },
            {
              label: "Customers",
              key: "/customer",
              icon: <UserOutlined />,
            },
          ]}
        ></Menu>
      </div>
    );
  }
  export default Sidebar;
  