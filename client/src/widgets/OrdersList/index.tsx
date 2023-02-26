import React from "react";
import { Avatar, Collapse, Divider, List, theme } from "antd";
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

  return (
    <Collapse
      bordered={false}
      accordion={true}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer, width: '100%' }}
    >
      {
        orders.reverse().map((item) => (
          <Panel header={
            <div className={styles.root__info}>
              <div className={styles.root__top}><span><BorderlessTableOutlined /> Заказ: #{item.id}</span><span>Сумма заказа: {item.totalPrice} ₽</span></div>
              <div className={styles.root__middle}><span><CalendarOutlined /> <Moment format='DD-MM-YYYY'>{item.createdAt}</Moment> в <Moment format='hh:mm'>{item.createdAt}</Moment></span></div>
              <div className={styles.root_bottom}><span><EnvironmentOutlined /> {item.type === 'delivery' ? `Доставка: улица ${item.address}, кв. ${item.room}` : 'Самовывоз: г. Армавир, ул. Кропоткина 194'}</span></div>
            </div>
          } key={item.id} style={panelStyle}>
            <Divider orientation="left">Имя</Divider>
            <p className={styles.root__data}>{item.name}</p>
            <Divider orientation="left">Телефон</Divider>
            <p className={styles.root__data}>{item.tel}</p>
            {
              item.type === 'delivery' &&
              (
                <>
                <Divider orientation="left">Адресс</Divider>
              <p className={styles.root__data}>{item.address}, подъезд {item.entrance}, этаж {item.floor}, кв. {item.room}</p>
                </>
              )
            }
            <Divider orientation="left">Время</Divider>
            <p className={styles.root__data}>{item.day === 'today' && 'Сегодня'} {item.time && 'в ' + item.time}</p>

            <Divider orientation="left">Способ оплаты</Divider>
            <p className={styles.root__data}>{item.payment === 'cash' ? 'Наличными' : 'Картой'}</p>

            <Divider orientation="left">Количество приборов</Divider>
            <p className={styles.root__data}>{item.utensils}</p>

            <br/>
                <List
                  key={item.id + item.totalPrice}
                  itemLayout="horizontal"
                  dataSource={item.orderProducts}
                  renderItem={(product) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar className={styles.root__avatar} shape="square" style={{border: '1px solid rgba(31, 32, 65, 0.1)'}} size={64} src={process.env.REACT_APP_API_URL + product.image} />}
                          title={product.name}
                          description={product.description}
                        />
                        <div>{product.price} ₽</div>
                      </List.Item>
                  )}
                />
          </Panel>
        ))
      }
    </Collapse>
  );
};

export default OrdersList;