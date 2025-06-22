import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
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

// Styled components with consistent sizing
const ProductSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: "#ffffff",
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
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 0),
  },
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: "center",
  color: "#000000",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
    marginBottom: theme.spacing(3),
  },
}));

const ProductImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 0,
  paddingBottom: "100%", // 1:1 aspect ratio
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
}));

const ProductImage = styled("img")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const DialogImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 0,
  paddingBottom: "80%", // Slightly rectangular for dialog
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const DialogImage = styled("img")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

const ColorButton = styled(Button)(({ theme, selected }) => ({
  width: "40px",
  height: "40px",
  minWidth: "40px",
  borderRadius: "50%",
  margin: theme.spacing(0.5),
  border: selected ? "3px solid #000000" : "2px solid #000000",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    border: "3px solid #000000",
  },
  [theme.breakpoints.down("sm")]: {
    width: "32px",
    height: "32px",
    minWidth: "32px",
  },
}));

const SizeButton = styled(Button)(({ theme, selected }) => ({
  minWidth: "60px",
  margin: theme.spacing(0.5),
  border: selected ? "2px solid #ff0000" : "1px solid #000000",
  color: selected ? "#ff0000" : "#000000",
  fontWeight: selected ? 600 : 400,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    border: "2px solid #ff0000",
    color: "#ff0000",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "50px",
    fontSize: "0.8rem",
  },
}));

const OfferBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: "#ff0000",
  color: "#ffffff",
  padding: theme.spacing(1, 2),
  borderRadius: "20px",
  fontWeight: "bold",
  fontSize: "0.9rem",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  zIndex: 1,
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
    "100%": { transform: "scale(1)" },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    padding: theme.spacing(0.5, 1.5),
  },
}));

const ProductCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  transition: "all 0.3s ease",
  cursor: "pointer",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const ThumbnailButton = styled(Button)(({ theme, selected }) => ({
  width: "60px",
  height: "60px",
  padding: 0,
  border: selected ? "2px solid #ff0000" : "1px solid #ddd",
  borderRadius: "8px",
  overflow: "hidden",
  transition: "all 0.3s ease",
  minWidth: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "50px",
    height: "50px",
  },
}));

const products = [
  {
    id: 1,
    name: "Adidas",
    price: 399,
    description:
      "ترنج اديدس الجديد بتصميمة الفريد وألوانة الأساسية متوفر الان بأعلي الخامات وافضل الاسعار فقط في XENO",
    images: [a1, a2, a3, a4, a5],
    colors: ["Black", "White", "Beige", "Navy", "Green"],
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
    colors: ["Black", "White"],
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
    colors: ["red", "White", "blue"],
    sizes: ["L", "XL", "2XL", "3XL"],
    offers: [{ quantity: 2, price: 850, discount: "11%" }],
  },
];

const ProductDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
    setCurrentImage(0);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  return (
    <ProductSection id="products">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <ProductTitle>Our Products</ProductTitle>
        </motion.div>

        <Grid container spacing={isMobile ? 2 : 4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <ProductCard
                  elevation={3}
                  onClick={() => handleOpenDialog(product)}
                >
                  <ProductImageContainer>
                    <ProductImage src={product.images[0]} alt={product.name} />
                    {product.offers[0]?.discount && (
                      <OfferBadge>{product.offers[0].discount} OFF</OfferBadge>
                    )}
                  </ProductImageContainer>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600, mt: 2 }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{ fontWeight: 700 }}
                  >
                    E£{product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      mt: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flexGrow: 1,
                    }}
                  >
                    {product.description}
                  </Typography>
                </ProductCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Product Detail Dialog */}
        <Dialog
          open={Boolean(selectedProduct)}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          scroll="body"
          fullScreen={isMobile}
        >
          <DialogTitle sx={{ py: isMobile ? 1 : 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant={isMobile ? "h5" : "h4"}>
                {selectedProduct?.name}
              </Typography>
              <IconButton
                onClick={handleCloseDialog}
                size={isMobile ? "small" : "medium"}
              >
                <CloseIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers sx={{ pt: isMobile ? 1 : 3 }}>
            {selectedProduct && (
              <Grid container spacing={isMobile ? 1 : 4}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <DialogImageContainer>
                      <DialogImage
                        src={selectedProduct.images[currentImage]}
                        alt={selectedProduct.name}
                      />
                    </DialogImageContainer>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                        mt: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {selectedProduct.images.map((image, index) => (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          key={index}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ThumbnailButton
                            onClick={() => handleImageChange(index)}
                            selected={currentImage === index}
                          >
                            <img
                              src={image}
                              alt={`${selectedProduct.name} ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </ThumbnailButton>
                        </motion.div>
                      ))}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: isMobile ? 2 : 3,
                      borderRadius: "16px",
                      background:
                        "linear-gradient(145deg, rgb(255, 255, 255) 0%, #f8f8f8 100%)",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {selectedProduct.name}
                    </Typography>
                    <Typography
                      variant={isMobile ? "h4" : "h3"}
                      color="secondary"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      E£{selectedProduct.price}
                    </Typography>

                    {selectedProduct.offers.some(
                      (offer) => offer.quantity && offer.price && offer.discount
                    ) && (
                      <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          عروض خاصة:
                        </Typography>
                        <Grid container spacing={1}>
                          {selectedProduct.offers.map(
                            (offer, index) =>
                              offer.quantity &&
                              offer.price &&
                              offer.discount && (
                                <Grid item xs={12} sm={6} key={index}>
                                  <Paper
                                    sx={{
                                      p: isMobile ? 1 : 2,
                                      border: "1px dashed #ff0000",
                                      backgroundColor: "#fff5f5",
                                      borderRadius: 2,
                                      boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
                                      textAlign: "center",
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        transform: "translateY(-3px)",
                                        boxShadow:
                                          "0 4px 12px rgba(255,0,0,0.1)",
                                      },
                                    }}
                                  >
                                    <>
                                      <Typography
                                        variant="body1"
                                        sx={{ fontWeight: 600 }}
                                      >
                                        {offer.quantity} قطع بـ E£{offer.price}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        color="error"
                                        sx={{ fontWeight: 600 }}
                                      >
                                        خصم {offer.discount}
                                      </Typography>
                                    </>
                                  </Paper>
                                </Grid>
                              )
                          )}
                        </Grid>
                      </Box>
                    )}

                    <Typography
                      variant="body1"
                      paragraph
                      sx={{
                        color: "#666",
                        lineHeight: 1.8,
                        mb: isMobile ? 2 : 3,
                      }}
                    >
                      {selectedProduct.description}
                    </Typography>

                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ mt: isMobile ? 1 : 2, fontWeight: 600 }}
                    >
                      اللون :
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mb: isMobile ? 2 : 3,
                      }}
                    >
                      {selectedProduct.colors.map((color) => (
                        <ColorButton
                          key={color}
                          selected={selectedColor === color}
                          onClick={() => handleColorSelect(color)}
                          sx={{
                            backgroundColor:
                              color === "Black"
                                ? "#000000"
                                : color === "White"
                                ? "#ffffff"
                                : color === "Beige"
                                ? "#ead6bd"
                                : color === "Navy"
                                ? "#222a3f"
                                : color === "Green"
                                ? "#7d8965"
                                : color === "red"
                                ? "#ff0000"
                                : color === "blue"
                                ? "#0000ff"
                                : "#cccccc",
                          }}
                        />
                      ))}
                    </Box>

                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      المقاس :
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mb: isMobile ? 2 : 3,
                      }}
                    >
                      {selectedProduct.sizes.map((size) => (
                        <SizeButton
                          key={size}
                          variant="outlined"
                          selected={selectedSize === size}
                          onClick={() => handleSizeSelect(size)}
                        >
                          {size}
                        </SizeButton>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </ProductSection>
  );
};

export default ProductDetails;
