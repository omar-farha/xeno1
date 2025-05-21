import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Modal, Backdrop, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import size from "../public/size.jpg";
import { initFacebookPixel, trackEvent } from "../facebookPixel";

const OrderSection = styled(motion(Box))(({ theme }) => ({
  padding: theme.spacing(12, 0),
  backgroundColor: "#f8f8f8",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: "linear-gradient(90deg, transparent, #ff0000, transparent)",
  },
}));

const FormContainer = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(6),
  maxWidth: "700px",
  margin: "0 auto",
  borderRadius: "20px",
  background: "linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "&:hover fieldset": {
      borderColor: "#ff0000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff0000",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#666",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#000000",
  color: "#ffffff",
  padding: theme.spacing(2, 6),
  borderRadius: "30px",
  fontSize: "1.1rem",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#ff0000",
    transform: "translateY(-2px)",
    boxShadow: "0 5px 15px rgba(255,0,0,0.3)",
  },
}));

const OrderForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    phone2: "",
    governorate: "",
    district: "",
    address: "",
    color: "",
    size: "",
    quantity: 1,
    code: "L1",
    offer: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.sheetbest.com/sheets/e58b4843-7922-420f-b1ec-d9c888b1d542",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Order submitted successfully!",
          severity: "success",
        });

        setFormData({
          name: "",
          phone: "",
          phone2: "",
          governorate: "",
          district: "",
          address: "",
          color: "",
          size: "",
          quantity: 1,
          code: "L1",
          offer: "",
        });
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error submitting order. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <OrderSection
      id="order"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Container>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "700",
            mb: 6,
            textTransform: "uppercase",
          }}
        >
          سجل بينات الطلب
        </Typography>

        <FormContainer
          elevation={3}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="الاسم كامل"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="اللون المختار"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
            <StyledTextField
              select
              fullWidth
              label="المقاس"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            >
              {["L", "XL", "2XL", "3XL"].map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </StyledTextField>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-start" }}>
              <Button
                variant="outlined"
                onClick={handleOpenModal}
                sx={{
                  borderColor: "#000",
                  color: "#000",
                  fontWeight: "bold",
                  ":hover": {
                    borderColor: "#ff0000",
                    color: "#ff0000",
                  },
                }}
              >
                جدول المقاسات
              </Button>
            </Box>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
                sx: { backdropFilter: "blur(6px)" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  borderRadius: "12px",
                  boxShadow: 24,
                  p: 2,
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  overflow: "auto",
                }}
              >
                <IconButton
                  onClick={handleCloseModal}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <CloseIcon />
                </IconButton>
                <img
                  src={size}
                  alt="جدول المقاسات"
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              </Box>
            </Modal>

            <StyledTextField
              select
              fullWidth
              label="العروض"
              name="offer"
              value={formData.offer}
              onChange={handleChange}
              required
            >
              {["عرض القطع واحده", "2 قطع بـ E£800", "3 قطع بـ E£1050"].map(
                (o) => (
                  <MenuItem key={o} value={o}>
                    {o}
                  </MenuItem>
                )
              )}
            </StyledTextField>
            <StyledTextField
              fullWidth
              label="العدد المطلوب"
              name="quantity"
              type="number"
              inputProps={{ min: 1 }}
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="رقم الهاتف"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              inputProps={{
                maxLength: 11,
                inputMode: "numeric",
              }}
            />
            <StyledTextField
              fullWidth
              label="رقم الهاتف اخر"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
              required
              inputProps={{
                maxLength: 11,
                inputMode: "numeric",
              }}
            />
            <StyledTextField
              select
              fullWidth
              label="المحافظة"
              name="governorate"
              value={formData.governorate}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            >
              {[
                "القاهرة",
                "الإسكندرية",
                "بورسعيد",
                "السويس",
                "دمياط",
                "الدقهلية",
                "الشرقية",
                "القليوبية",
                "كفر الشيخ",
                "الغربية",
                "المنوفية",
                "البحيرة",
                "الإسماعيلية",
                "الجيزة",
                "بني سويف",
                "الفيوم",
                "المنيا",
                "أسيوط",
                "سوهاج",
                "قنا",
                "الأقصر",
                "أسوان",
                "البحر الأحمر",
                "الوادي الجديد",
                "مطروح",
                "شمال سيناء",
                "جنوب سيناء",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </StyledTextField>

            {/* حقل البلدة/القرية/الحي */}
            <StyledTextField
              fullWidth
              label="البلدة/القرية/الحي"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />
            <StyledTextField
              fullWidth
              label="العنوان"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              multiline
              rows={3}
            />

            <StyledTextField
              fullWidth
              label="الكود"
              name="code"
              value="L1"
              defaultValue="L1"
              disabled
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  color: "black",
                  WebkitTextFillColor: "black",
                },
              }}
            />
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <SubmitButton
                type="submit"
                variant="contained"
                disabled={loading}
                onClick={() => trackEvent("Subscribe")}
              >
                {loading ? "يتم التأكيد..." : "تأكيد الطلب"}
              </SubmitButton>
            </Box>
          </form>
        </FormContainer>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </OrderSection>
  );
};

export default OrderForm;
