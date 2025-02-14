import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const ProductCard = ({ product }) => {
  return (
    <Box
      w="100%"  
      h="100%"
      boxShadow="2xl"
      rounded="md"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
    >
      <Box position="relative" w="100%" h="300px">
        <Image
          src={product?.image || "/placeholder.jpg"}
          alt={product?.name || "Product"}
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product?.name || "Product Name"}
        </Heading>

        <Text fontWeight="bold" fontSize="lg" mb={4}>
          {product?.price || "$0.00"}
        </Text>

        <HStack spacing={2}>
          <IconButton
            aria-label="Edit product"
            icon={<EditIcon />}
            colorScheme="blue"
          />
          <IconButton
            aria-label="Delete product"
            icon={<DeleteIcon />}
            colorScheme="red"
          />
        </HStack>
      </Box>
    </Box>
  );
};


export default ProductCard;
