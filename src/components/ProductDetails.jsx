import React, { useState } from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import a1 from "../public/b1.jpg";
import a2 from "../public/b2.jpg";
import a3 from "../public/b3.jpg";
import a4 from "../public/b4.jpg";
import a5 from "../public/b5.jpg";

const ProductSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
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
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: "700",
  marginBottom: theme.spacing(6),
  textAlign: "center",
  color: "#000000",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
}));

const ProductImage = styled("img")(({ theme }) => ({
  width: "70%",
  height: "auto",
  display: "block",
  margin: "0 auto",
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const ColorButton = styled(Button)(({ theme, selected }) => ({
  width: "40px",
  height: "40px",
  minWidth: "40px",
  borderRadius: "50%",
  margin: theme.spacing(1),
  border: selected ? "3px solid #000000" : "2px solid #000000",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    border: "3px solid #000000",
  },
}));

const SizeButton = styled(Button)(({ theme, selected }) => ({
  minWidth: "60px",
  margin: theme.spacing(1),
  border: selected ? "2px solid #ff0000" : "1px solid #000000",
  color: selected ? "#ff0000" : "#000000",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    border: "2px solid #ff0000",
    color: "#ff0000",
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
}));

const OffersSection = styled(Box)(({ theme }) => ({
  backgroundColor: "#f9f9f9",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  border: "1px dashed #ff0000",
  position: "relative",
}));

const OfferItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5),
  margin: theme.spacing(1, 0),
  backgroundColor: "#fff",
  borderRadius: theme.spacing(1),
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
}));

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [currentImage, setCurrentImage] = useState(0);
  const offers = [
    { quantity: 2, price: 700, discount: "11%" },
    { quantity: 3, price: 950, discount: "22%" },
  ];

  const product = {
    name: "Adidas",
    price: 399,
    description:
      "ترنج اديدس الجديد بتصميمة الفريد وألوانة الأساسية متوفر الان بأعلي الخامات وافضل الاسعار فقط في XENO ",
    images: [a1, a2, a3, a4, a5],
    colors: ["Black", "White", "Beige", "Navy", "Green"],
    sizes: ["L", "XL", "2XL", "3XL"],
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
    <ProductSection id="product">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <ProductTitle>{product.name}</ProductTitle>
        </motion.div>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ProductImage
                src={product.images[currentImage]}
                alt={product.name}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                {product.images.map((image, index) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    key={index}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      onClick={() => handleImageChange(index)}
                      sx={{
                        width: "60px",
                        height: "60px",
                        p: 0,
                        border:
                          currentImage === index
                            ? "2px solid #ff0000"
                            : "1px solid #ddd",
                        borderRadius: "8px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Button>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: "16px",
                  background:
                    "linear-gradient(145deg,rgb(255, 255, 255) 0%, #f8f8f8 100%)",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h3"
                  color="secondary"
                  gutterBottom
                  sx={{ fontWeight: "700" }}
                >
                  E£{product.price}
                </Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "600", mb: 1 }}
                  >
                    عروض خاصة:
                  </Typography>
                  <Grid container spacing={1}>
                    {offers.map((offer, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper
                          sx={{
                            p: 2,
                            border: "1px dashed #ff0000",
                            backgroundColor: "#fff5f5",
                            borderRadius: 2,
                            boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
                            textAlign: "center",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 4px 12px rgba(255,0,0,0.1)",
                              marginBottom: "30px",
                            },
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "600" }}
                          >
                            {offer.quantity} قطع بـ E£{offer.price}
                          </Typography>
                          <Typography variant="caption" color="error">
                            خصم {offer.discount}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: "#666", lineHeight: 1.8 }}
                >
                  {product.description}
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ mt: 4, fontWeight: "600" }}
                >
                  اللون :
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
                  {product.colors.map((color) => (
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
                            : "#ff0000",
                      }}
                    />
                  ))}
                </Box>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                >
                  المقاس :
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
                  {product.sizes.map((size) => (
                    <SizeButton
                      key={size}
                      selected={selectedSize === size}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </SizeButton>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </ProductSection>
  );
};

export default ProductDetails;
