import React, { useEffect } from 'react';
import { Divider as DividerAnt } from 'antd';
import Moment from 'react-moment';
import styles from './index.module.scss';
import {
  BorderlessTableOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import Colors from '@shared/utils/Colors';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '@store/hooks';
import {
  DeviceType,
  selectAdaptiveServiceSlice,
} from '@store/features/adaptive';
import { selectBranch } from '@store/features/branch/api';
import { IOrder } from '@store/features/order/model';
import checkDateIsToday from '@shared/utils/checkDateIsToday';

interface IProps {
  orders: IOrder[];
}

const OrdersList = ({ orders }: IProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
  const { currentBranch } = useAppSelector(selectBranch);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const renderStatus = (order: IOrder) => {
    switch (order.status) {
      case 'new':
        return (
          <Chip className={styles.status} label="В обработке" color="info" />
        );
      case 'accepted':
        return (
          <Chip className={styles.status} label="Принят" color="primary" />
        );
      case 'production':
        return (
          <Chip
            className={styles.status}
            label="В производстве"
            color="primary"
          />
        );
      case 'produced':
        return (
          <Chip
            className={styles.status}
            label="Произведен"
            color="secondary"
          />
        );
      case 'delivery':
        return (
          <Chip className={styles.status} label="В пути" color="warning" />
        );
      case 'completed':
        return (
          <Chip className={styles.status} label="Выполнен" color="success" />
        );
      case 'deleted':
        return <Chip className={styles.status} label="Отменен" color="error" />;
      default:
        return (
          <Chip className={styles.status} label="В обработке" color="info" />
        );
    }
  };

  useEffect(() => {
    console.log(orders);
  }, []);

  const renderOrders = () => (
    <div style={{ width: '100%' }}>
      {orders.map((order) => (
        <Accordion
          sx={{
            background: Colors.$rootCardBackground,
            '&:before': { backgroundColor: Colors.$infoColor },
          }}
          expanded={expanded === String(order.id)}
          key={order.id}
          onChange={handleChange(String(order.id))}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: Colors.$rootText }} />}
            sx={{
              '& .MuiAccordionSummary-content': {
                flexDirection:
                  deviceType === DeviceType.DESKTOP ? 'row' : 'column',
                rowGap: '10px',
              },
            }}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Stack
              sx={{
                width: deviceType === DeviceType.DESKTOP ? '50%' : '100%',
                flexShrink: 0,
              }}
            >
              <Typography sx={{ color: Colors.$rootText }}>
                <span>
                  <BorderlessTableOutlined /> Заказ: #{order.id}
                </span>
              </Typography>
              <Typography sx={{ color: Colors.$rootText }}>
                <span>
                  <CalendarOutlined />{' '}
                  <Moment format="DD-MM-YYYY">{order.createdAt}</Moment> в{' '}
                  <Moment format="HH:mm">{order.createdAt}</Moment>
                </span>
              </Typography>
              <Typography sx={{ color: Colors.$rootText }}>
                <span>
                  <EnvironmentOutlined />{' '}
                  {order.type === 'DELIVERY'
                    ? `Доставка: г. ${currentBranch?.name}, ул. ${order.clientAddress}, кв. ${order.clientRoom}`
                    : `Самовывоз: г. ${currentBranch?.name}, ул. Кропоткина 194`}
                </span>
              </Typography>
            </Stack>
            <Stack sx={{ rowGap: '10px' }}>
              {renderStatus(order)}
              <Typography sx={{ color: Colors.$rootText }}>
                <span>Сумма заказа: {order.totalPrice} ₽</span>
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <DividerAnt orientation="left" className={styles.divider}>
              Имя
            </DividerAnt>
            <Typography
              className={styles.root__data}
              sx={{ color: Colors.$rootText }}
            >
              {order.clientName}
            </Typography>
            <DividerAnt orientation="left" className={styles.divider}>
              Телефон
            </DividerAnt>
            <Typography
              className={styles.root__data}
              sx={{ color: Colors.$rootText }}
            >
              {order.clientTel}
            </Typography>
            {order.type === 'DELIVERY' && (
              <>
                <DividerAnt orientation="left" className={styles.divider}>
                  Адресс
                </DividerAnt>
                <Typography
                  className={styles.root__data}
                  sx={{ color: Colors.$rootText }}
                >{`${order.clientAddress} ${
                  order.clientEntrance
                    ? ', подъезд ' + order.clientEntrance
                    : ''
                } ${order.clientFloor ? ', этаж ' + order.clientFloor : ''} ${
                  order.clientRoom ? ', кв. ' + order.clientRoom : ''
                }`}</Typography>
              </>
            )}
            <DividerAnt orientation="left" className={styles.divider}>
              Время
            </DividerAnt>
            {!order.preOrderDate ? (
              <Typography
                className={styles.root__data}
                sx={{ color: Colors.$rootText }}
              >
                Как можно скорее
              </Typography>
            ) : (
              <Typography
                className={styles.root__data}
                sx={{ color: Colors.$rootText }}
              >
                {checkDateIsToday(order.preOrderDate)
                  ? 'Сегодня'
                  : new Date(order.preOrderDate).toLocaleDateString()}{' '}
                {order.preOrderDate &&
                  'в ' + new Date(order.preOrderDate).toLocaleTimeString()}
              </Typography>
            )}

            <DividerAnt orientation="left" className={styles.divider}>
              Способ оплаты
            </DividerAnt>
            <Typography
              className={styles.root__data}
              sx={{ color: Colors.$rootText }}
            >
              {order.payment === 'CASH' ? 'Наличными' : 'Картой'}
            </Typography>

            <DividerAnt orientation="left" className={styles.divider}>
              Количество приборов
            </DividerAnt>
            <Typography
              className={styles.root__data}
              sx={{ color: Colors.$rootText }}
            >
              {order.utensils}
            </Typography>

            <br />

            {order.orderProducts?.map((product, index: number) => (
              <List
                key={product.id}
                sx={{ width: '100%', bgcolor: 'transparent' }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        product?.image
                          ? `${process.env.REACT_APP_API_URL}/images/products/${product.image}`
                          : ''
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ color: Colors.$rootText }}
                    primary={
                      product.name +
                      (product.productSize && product.isPizza
                        ? ' ' + product.productSize
                        : '') +
                      ` - ${product.amount}шт.`
                    }
                    secondary={
                      <React.Fragment>
                        <span
                          style={{
                            color: Colors.$rootText,
                            fontSize: '12px',
                          }}
                        >
                          {product.description}
                        </span>
                        <br />
                        <span
                          style={{
                            color: Colors.$rootText,
                            fontSize: '12px',
                          }}
                        >
                          Стоимость: {product.amount}шт * {product.price} ₽ ={' '}
                          {order.totalPrice} ₽
                        </span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index !== (order.orderProducts?.length || 0) - 1 && (
                  <Divider
                    variant="inset"
                    sx={{ borderColor: Colors.$infoColor }}
                    component="li"
                  />
                )}
              </List>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );

  return renderOrders();
};

export default OrdersList;
