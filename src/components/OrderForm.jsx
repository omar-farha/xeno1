import React, { useState, useEffect } from "react";
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
  Modal,
  Backdrop,
  IconButton,
  Chip,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import size from "../public/size2.jpg";
import { initFacebookPixel, trackEvent } from "../facebookPixel";
import a1 from "../public/b1.jpg";
import a2 from "../public/b2.jpg";
import a3 from "../public/b3.jpg";
import a4 from "../public/b4.jpg";
import a5 from "../public/b5.jpg";
import c1 from "../public/c1.jpg";
import c2 from "../public/c2.jpg";
import c3 from "../public/c3.jpg";
import c4 from "../public/c4.jpg";
import c5 from "../public/c5.jpg";
import c6 from "../public/c6.jpg";
import d1 from "../public/d1.jpg";
import d2 from "../public/d2.jpg";
import d3 from "../public/d3.jpg";

// Product data
const products = [
  {
    id: 1,
    name: "Adidas",
    price: 399,
    description:
      "ترنج اديدس الجديد بتصميمة الفريد وألوانة الأساسية متوفر الان بأعلي الخامات وافضل الاسعار فقط في XENO",
    images: [a1, a2, a3, a4, a5],
    colors: ["اسود", "ابيض", "بيج", "كحلي", "زيتي"],
    sizes: ["L", "XL", "2XL", "3XL"],
    offers: [
      { quantity: 2, price: 700, discount: "11%" },
      { quantity: 3, price: 950, discount: "22%" },
    ],
  },
  {
    id: 2,
    name: "The North Face",
    price: 499,
    description:
      "ترنج نورث فيس الرياضي بتصميم عصري وألوان جذابة، مناسب لجميع المناسبات مع أعلى جودة وأفضل سعر",
    images: [c1, c2, c3, c4, c5, c6],
    colors: ["اسود", "ابيض"],
    sizes: ["L", "XL", "2XL", "3XL"],
    offers: [{ quantity: 2, price: 950, discount: "10%" }],
  },
  {
    id: 3,
    name: "Adidas Sit",
    price: 450,
    description:
      "ترنج اديدس الكلاسيكي بتصميم مريح وأنيق، متوفر بعدة ألوان تناسب جميع الأذواق",
    images: [d1, d2, d3],
    colors: ["احمر", "ابيض", "ازرق"],
    sizes: ["L", "XL", "2XL", "3XL"],
    offers: [{ quantity: 2, price: 850, discount: "11%" }],
  },
];

// Styled components
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

const ColorSizePair = styled(Box)(({ theme }) => ({
  border: "1px solid #eee",
  padding: theme.spacing(2),
  borderRadius: "8px",
  marginBottom: theme.spacing(2),
  backgroundColor: "#fafafa",
}));

const OrderForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    code: "",
    offer: "",
    productName: "",
    selectedOffer: null,
    colorSizePairs: [], // لتخزين أزواج اللون والمقاس
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Get product code based on ID
  const getProductCode = (productId) => {
    switch (productId) {
      case 1:
        return "AD1";
      case 2:
        return "N3";
      case 3:
        return "BRW1";
      default:
        return "";
    }
  };

  // Update form when product changes
  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productName: selectedProduct.name,
        color: selectedProduct.colors[0] || "",
        size: selectedProduct.sizes[0] || "",
        code: getProductCode(selectedProduct.id),
        offer: "",
        selectedOffer: null,
        quantity: 1,
        colorSizePairs: [
          {
            color: selectedProduct.colors[0] || "",
            size: selectedProduct.sizes[0] || "",
          },
        ],
      }));
    }
  }, [selectedProduct]);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleColorSizeChange = (index, field, value) => {
    const newColorSizePairs = [...formData.colorSizePairs];
    newColorSizePairs[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      colorSizePairs: newColorSizePairs,
    }));
  };

  const handleOfferChange = (e) => {
    const offerText = e.target.value;
    const selectedOffer = selectedProduct?.offers.find((offer) =>
      offerText.includes(`${offer.quantity} قطع`)
    );

    if (selectedOffer) {
      // إنشاء مصفوفة جديدة لأزواج اللون والمقاس بناءً على الكمية
      const newColorSizePairs = Array(selectedOffer.quantity)
        .fill()
        .map((_, i) => ({
          color:
            formData.colorSizePairs[i]?.color ||
            selectedProduct.colors[0] ||
            "",
          size:
            formData.colorSizePairs[i]?.size || selectedProduct.sizes[0] || "",
        }));

      setFormData((prev) => ({
        ...prev,
        offer: offerText,
        selectedOffer,
        quantity: selectedOffer.quantity,
        colorSizePairs: newColorSizePairs,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        offer: offerText,
        selectedOffer: null,
        quantity: 1,
        colorSizePairs: [
          {
            color: selectedProduct?.colors[0] || "",
            size: selectedProduct?.sizes[0] || "",
          },
        ],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // تحضير البيانات للإرسال
    const colors = formData.colorSizePairs.map((pair) => pair.color).join("، ");
    const sizes = formData.colorSizePairs.map((pair) => pair.size).join("، ");
    const colorSizeDetails = formData.colorSizePairs
      .map((pair) => `${pair.color} (${pair.size})`)
      .join("، ");

    const submissionData = {
      ...formData,
      color: colors,
      size: sizes,
      colorSizeDetails: colorSizeDetails, // حقل جديد يوضح العلاقة بين اللون والمقاس
    };

    try {
      const response = await fetch(
        "https://api.sheetbest.com/sheets/69d5d85e-714f-4e5d-9296-9502249d4e0e",
        {
          method: "POST",
          body: JSON.stringify(submissionData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "تم إرسال الطلب بنجاح!",
          severity: "success",
        });
        setFormData({
          name: "",
          phone: "",
          phone2: "",
          governorate: "",
          district: "",
          address: "",
          color: selectedProduct?.colors[0] || "",
          size: selectedProduct?.sizes[0] || "",
          quantity: 1,
          code: selectedProduct ? getProductCode(selectedProduct.id) : "",
          offer: "",
          productName: selectedProduct?.name || "",
          selectedOffer: null,
          colorSizePairs: [
            {
              color: selectedProduct?.colors[0] || "",
              size: selectedProduct?.sizes[0] || "",
            },
          ],
        });
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateOffers = () => {
    if (!selectedProduct) return [];

    const baseOffer = `${selectedProduct.name} - 1 قطعة بـ E£${selectedProduct.price}`;

    const productOffers = selectedProduct.offers.map(
      (offer) =>
        `${offer.quantity} قطع بـ E£${offer.price} (خصم ${offer.discount})`
    );

    return [baseOffer, ...productOffers];
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
          سجل بيانات الطلب
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
              select
              fullWidth
              label="اختر المنتج"
              name="product"
              value={selectedProduct?.id || ""}
              onChange={handleProductChange}
              required
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name} - E£{product.price}
                </MenuItem>
              ))}
            </StyledTextField>

            {selectedProduct && (
              <>
                <StyledTextField
                  fullWidth
                  label="المنتج المختار"
                  name="productName"
                  value={selectedProduct.name}
                  disabled
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black",
                      WebkitTextFillColor: "black",
                    },
                  }}
                />

                <StyledTextField
                  select
                  fullWidth
                  label="العروض"
                  name="offer"
                  value={formData.offer}
                  onChange={handleOfferChange}
                  required
                >
                  {generateOffers().map((offer, index) => (
                    <MenuItem key={index} value={offer}>
                      {offer}
                    </MenuItem>
                  ))}
                </StyledTextField>

                {formData.colorSizePairs.map((pair, index) => (
                  <ColorSizePair key={index}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      قطعة {index + 1}
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <StyledTextField
                          select
                          fullWidth
                          label={`لون القطعة ${index + 1}`}
                          value={pair.color}
                          onChange={(e) =>
                            handleColorSizeChange(
                              index,
                              "color",
                              e.target.value
                            )
                          }
                          required
                        >
                          {selectedProduct.colors.map((color) => (
                            <MenuItem key={color} value={color}>
                              {color}
                            </MenuItem>
                          ))}
                        </StyledTextField>
                      </Grid>
                      <Grid item xs={6}>
                        <StyledTextField
                          select
                          fullWidth
                          label={`مقاس القطعة ${index + 1}`}
                          value={pair.size}
                          onChange={(e) =>
                            handleColorSizeChange(index, "size", e.target.value)
                          }
                          required
                        >
                          {selectedProduct.sizes.map((size) => (
                            <MenuItem key={size} value={size}>
                              {size}
                            </MenuItem>
                          ))}
                        </StyledTextField>
                      </Grid>
                    </Grid>
                  </ColorSizePair>
                ))}

                <Box
                  sx={{ mb: 3, display: "flex", justifyContent: "flex-start" }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => setOpenModal(true)}
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

                <StyledTextField
                  fullWidth
                  label="العدد المطلوب"
                  name="quantity"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  disabled={!!formData.selectedOffer}
                />
              </>
            )}

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
              label="رقم هاتف آخر"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
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
            >
              {[
                "القاهرة",
                "الجيزة",
                "الإسكندرية",
                "الدقهلية",
                "البحر الأحمر",
                "البحيرة",
                "الفيوم",
                "الغربية",
                "الإسماعيلية",
                "المنوفية",
                "المنيا",
                "القليوبية",
                "الوادي الجديد",
                "السويس",
                "أسوان",
                "أسيوط",
                "بني سويف",
                "بورسعيد",
                "دمياط",
                "الشرقية",
                "جنوب سيناء",
                "كفر الشيخ",
                "مطروح",
                "الأقصر",
                "قنا",
                "شمال سيناء",
                "سوهاج",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </StyledTextField>

            <StyledTextField
              fullWidth
              label="البلدة/القرية/الحي"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            />

            <StyledTextField
              fullWidth
              label="العنوان التفصيلي"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              multiline
              rows={3}
            />

            <StyledTextField
              fullWidth
              label="كود المنتج"
              name="code"
              value={formData.code}
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
                disabled={loading || !selectedProduct}
                onClick={() => trackEvent("Subscribe")}
              >
                {loading ? "يتم التأكيد..." : "تأكيد الطلب"}
              </SubmitButton>
            </Box>
          </form>
        </FormContainer>
      </Container>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
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
            onClick={() => setOpenModal(false)}
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
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
