import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Navbar } from "../../components/Navbar";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  Button,
  Container,
  List,
  ListItem,
  MenuItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Pagination,
  PaginationItem,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Box } from "@mui/system";
import { PrintOrder } from "../../components/PrintOrder/PrintOrder";
import { Order } from "../SearchOrder/Order";

export const Orders = ({ setRoute }) => {
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterBy, setfilterBy] = useState("created_at");
  const [inicio, setInicio] = useState(null);
  const [fin, setFin] = useState(null);
  const [clearFields, setClearFields] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshSeeOrders, setRefreshSeeOrders] = useState(false);

  const [orderNumberTmp, setOrderNumberTmp] = useState(null);

  const [paymentPending, setPaymentPending] = useState(0);
  const [paymentFactured, setPaymentFactured] = useState(0);
  const [ordersPaymentPending, setOrdersPaymentPending] = useState(0);
  const [ordersDeliveryPending, setOrdersDeliveryPending] = useState(0);

  const [paymentRecolected, setPaymentRecolected] = useState(0);
  const [ordersPaymentDone, setOrdersPaymentDone] = useState(0);
  const [ordersDeliveryDone, setOrdersDeliveryDone] = useState(0);
  const [paymentPaid, setPaymentPaid] = useState(0);

  const printOrder = useRef();
  const handlePrint = useReactToPrint({
    content: () => printOrder.current,
  });

  const handleOrder = (id) => {
    setLoading(true);
    let order = orders.filter((item) => item.ID === id);
    setOrder(order[0]);
    setTimeout(() => {
      handlePrint();
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    setClearFields(false);
    setRefreshSeeOrders(false);
    const getOrder = async () => {
      let dateNow = new Date();
      let oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const data = await window.go.service.OrderService.ListOrdersByRange(
        oneMonthAgo.toISOString(),
        dateNow.toISOString(),
        10,
        0,
        filterBy
      );
      setInicio(oneMonthAgo.toISOString());
      setFin(dateNow.toISOString());
      setOrders(data.orders);
      setPage(data.pages);
      setPaymentPending(data.payment_pending);
      setPaymentRecolected(data.payment_recolected);
      setOrdersPaymentPending(data.orders_payment_pending);
      setOrdersDeliveryPending(data.orders_delivery_pending);
      setOrdersPaymentDone(data.orders_payment_done);
      setOrdersDeliveryDone(data.orders_delivery_done);
      setPaymentPaid(data.payment_paid);
      setPaymentFactured(data.payment_factured);
    };
    getOrder();
  }, [clearFields, refreshSeeOrders]);

  const filterItems = [
    { value: "created_at", label: "Fecha de recibido" },
    { value: "delivered_at", label: "Fecha de entregado" },
    { value: "payed_at", label: "Fecha de pagado" },
    { value: "delivered_pending", label: "Ordenes pendientes de entrega" },
    { value: "payed_pending", label: "Ordenes pendientes de pago" },
  ];

  const clearFilter = () => {
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    setInicio(oneMonthAgo);
    setFin(new Date());
    setfilterBy("created_at");
    setClearFields(true);
  };

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  const pageHandle = async (e, page) => {
    let data = await window.go.service.OrderService.ListOrdersByRange(
      inicio,
      fin,
      10,
      page,
      filterBy
    );
    setOrders(data.orders);
    setPage(data.pages);
    setPaymentPending(data.payment_pending);
    setPaymentRecolected(data.payment_recolected);
    setOrdersPaymentPending(data.orders_payment_pending);
    setOrdersDeliveryPending(data.orders_delivery_pending);
    setOrdersPaymentDone(data.orders_payment_done);
    setOrdersDeliveryDone(data.orders_delivery_done);
    setPaymentPaid(data.payment_paid);
    setPaymentFactured(data.payment_factured);
  };

  const onSubmit = async () => {
    let data = await window.go.service.OrderService.ListOrdersByRange(
      inicio,
      fin,
      10,
      0,
      filterBy
    );
    setOrders(data.orders);
    setPage(data.pages);
    setPaymentPending(data.payment_pending);
    setPaymentRecolected(data.payment_recolected);
    setOrdersPaymentPending(data.orders_payment_pending);
    setOrdersDeliveryPending(data.orders_delivery_pending);
    setOrdersPaymentDone(data.orders_payment_done);
    setOrdersDeliveryDone(data.orders_delivery_done);
    setPaymentPaid(data.payment_paid);
    setPaymentFactured(data.payment_factured);
  };

  return (
    <>
      <Navbar />
      <Stack>
        {orders && (
          <>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Stack>
                <Typography sx={{ mb: 1.5 }} variant="h6" color="text.terceary">
                  Total saldo: <strong>{paymentPending}</strong>
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="h6" color="text.terceary">
                  Total cancelado : <strong>{paymentPaid}</strong>
                  {/* payment_paid */}
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ mb: 1.5 }} variant="h6" color="text.terceary">
                  Total Abono: <strong>{paymentRecolected}</strong>
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="h6" color="text.terceary">
                  Total facturado: <strong>{paymentFactured}</strong>
                  {/* payment_factured */}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-select-currency"
                select
                label="Fecha de creacion"
                value={filterBy}
                onChange={(e) => setfilterBy(e.target.value)}
                sx={{ width: "20%" }}
              >
                {filterItems.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={inicio}
                  onChange={(value) => {
                    setInicio(value.toISOString());
                  }}
                  renderInput={(props) => (
                    <TextField required {...props} sx={{ marginBottom: 3 }} />
                  )}
                  label="Inicio"
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={fin}
                  onChange={(value) => {
                    setFin(value.toISOString());
                  }}
                  renderInput={(props) => (
                    <TextField required {...props} sx={{ marginBottom: 3 }} />
                  )}
                  label="Fin"
                />
              </LocalizationProvider>
              <Button onClick={onSubmit}>Buscar</Button>
              <Button onClick={clearFilter}>Limpiar</Button>
            </Stack>
          </>
        )}
      </Stack>
      <Pagination
        count={page}
        onChange={(e, page) => pageHandle(e, page)}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
      <Stack>
        {orders &&
          orders.map((order) => {
            return (
              <Order
                key={order.ID}
                order={order}
                setOrder={setOrder}
                setOrderNumberTmp={setOrderNumberTmp}
                handlePrint={handlePrint}
                setRefreshSeeOrders={setRefreshSeeOrders}
              />
            );
          })}
      </Stack>
      {order && (
        <PrintOrder
          order={order}
          orderNumber={order.identifier}
          componentRef={printOrder}
          handlePrint={handlePrint}
        />
      )}
    </>
  );
};
