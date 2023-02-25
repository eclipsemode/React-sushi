import React from "react";
import { Avatar, Collapse, List, theme } from "antd";
import { IOrdersFetched } from "../Account/api";
import Moment from 'react-moment';
import styles from './index.module.css'
import { BorderlessTableOutlined, CalendarOutlined, CaretRightOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

interface IOrdersList {
  orders: IOrdersFetched[]
}
const OrdersList:React.FC<IOrdersList> = ({orders}) => {
  const { token } = theme.useToken();

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  console.log(orders.map(item => item))

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer, width: '100%' }}
    >
      {
        orders.map((item) => (
          <Panel header={
            <div className={styles.root__info}>
              <div className={styles.root__top}><span><BorderlessTableOutlined /> Заказ: #{item.id}</span><span>Сумма заказа: {item.totalPrice} ₽</span></div>
              <div className={styles.root__middle}><span><CalendarOutlined /> <Moment format='DD-MM-YYYY'>{item.createdAt}</Moment> в <Moment format='hh:mm'>{item.createdAt}</Moment></span></div>
              <div className={styles.root_bottom}><span><EnvironmentOutlined /> {item.type === 'delivery' ? `Доставка: улица ${item.address}, кв. ${item.room}` : 'Самовывоз: г. Армавир, ул. Кропоткина 194'}</span></div>
            </div>
          } key={item.id} style={panelStyle}>
            {
                <List
                  key={item.id + item.totalPrice}
                  itemLayout="horizontal"
                  dataSource={item.orderProducts}
                  renderItem={() => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                          title={'Ant Design Title' }
                          description='Ant Design, a design language for background applications, is refined by Ant UED'
                        />
                      </List.Item>
                  )}
                />
            }
          </Panel>
        ))
      }
    </Collapse>
  );
};

export default OrdersList;