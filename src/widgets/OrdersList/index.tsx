import React from "react";
import { Divider as DividerAnt } from "antd";
import { IOrdersFetched } from "../Account/api";
import Moment from 'react-moment';
import styles from './index.module.scss'
import { BorderlessTableOutlined, CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Colors from "../../app/utils/Colors";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Stack} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {useAppSelector} from "../../app/hooks";
import {DeviceType, selectAdaptiveServiceSlice} from "../../processes/services/adaptiveService/adaptiveService";

interface IOrdersList {
  orders: IOrdersFetched[]
}
const OrdersList:React.FC<IOrdersList> = ({orders}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);

  const handleChange =
      (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };

  const renderOrders = () => (
      <div style={{width: '100%'}}>
        {
          orders.map((order) => (
              <Accordion sx={{background: Colors.$rootCardBackground}} expanded={expanded === String(order.id)} key={order.id} onChange={handleChange(String(order.id))}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: Colors.$rootText}} />}
                    sx={{'& .MuiAccordionSummary-content': {flexDirection: deviceType === DeviceType.DESKTOP ? 'row' : 'column'} }}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Stack sx={{width: deviceType === DeviceType.DESKTOP ? '50%' : '100%', flexShrink: 0}}>
                      <Typography sx={{color: Colors.$rootText }}><span><BorderlessTableOutlined />Заказ: #{order.id}</span></Typography>
                      <Typography sx={{color: Colors.$rootText }}><span><CalendarOutlined /><Moment format='DD-MM-YYYY'>{order.createdAt}</Moment> в <Moment format='hh:mm'>{order.createdAt}</Moment></span></Typography>
                      <Typography sx={{color: Colors.$rootText }}><span><EnvironmentOutlined />{order.type === 'delivery' ? `Доставка: улица ${order.address}, кв. ${order.room}` : 'Самовывоз: г. Армавир, ул. Кропоткина 194'}</span></Typography>
                    </Stack>
                  <Typography sx={{ color: Colors.$rootText }}><span>Сумма заказа: {order.totalPrice} ₽</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DividerAnt orientation="left" className={styles.divider}>Имя</DividerAnt>
                  <Typography className={styles.root__data} sx={{color: Colors.$rootText}}>{order.name}</Typography>
                    <DividerAnt orientation="left" className={styles.divider}>Телефон</DividerAnt>
                  <Typography className={styles.root__data} sx={{color: Colors.$rootText}}>{order.tel}</Typography>
                    {
                        order.type === 'delivery' &&
                        (
                            <>
                              <DividerAnt orientation="left" className={styles.divider}>Адресс</DividerAnt>
                              <p className={styles.root__data}>{order.address}, подъезд {order.entrance}, этаж {order.floor}, кв. {order.room}</p>
                            </>
                        )
                    }
                    <DividerAnt orientation="left" className={styles.divider}>Время</DividerAnt>
                  <Typography className={styles.root__data} sx={{color: Colors.$rootText}}>{order.day === 'today' && 'Сегодня'} {order.time && 'в ' + order.time}</Typography>

                    <DividerAnt orientation="left" className={styles.divider}>Способ оплаты</DividerAnt>
                  <Typography className={styles.root__data} sx={{color: Colors.$rootText}}>{order.payment === 'cash' ? 'Наличными' : 'Картой'}</Typography>

                    <DividerAnt orientation="left" className={styles.divider}>Количество приборов</DividerAnt>
                  <Typography className={styles.root__data} sx={{color: Colors.$rootText}}>{order.utensils}</Typography>

                    <br/>


                  {
                    order.orderProducts.map((product, index) => (
                        <List key={product.id + product.name} sx={{ width: '100%', bgcolor: 'transparent' }}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar alt="Remy Sharp" src={process.env.REACT_APP_API_URL + product.image} />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{color: Colors.$rootText}}
                                primary={product.name}
                                secondary={
                                  <React.Fragment>
                                    <span style={{color: Colors.$rootText, fontSize: '12px'}}>{product.description}</span>
                                    <br/>
                                    <span style={{color: Colors.$rootText, fontSize: '12px'}}>Стоимость: {product.price} ₽</span>
                                  </React.Fragment>
                                }
                            />
                          </ListItem>
                          {
                            index !== order.orderProducts.length - 1 && <Divider variant="inset" sx={{borderColor: Colors.$infoColor}} component="li" />
                          }
                        </List>
                    ))
                  }
                </AccordionDetails>
              </Accordion>
          ))
        }
      </div>
  )

  return renderOrders();
};

export default OrdersList;