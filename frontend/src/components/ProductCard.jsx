import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  Image,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.700", "gray.100");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();

  const toast = useToast();
  const handleDelete = async (_id) => {
    const data = await deleteProduct(_id);
    if (!data.success) {
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="100%"
      h="100%"
      boxShadow="2xl"
      rounded="md"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
      bg={bgColor}
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

        <Text fontWeight="bold" fontSize="lg" mb={4} textColor={textColor}>
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
            onClick={() => handleDelete(product._id)}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
