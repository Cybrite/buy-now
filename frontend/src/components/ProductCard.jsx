import { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  Image,
  useColorModeValue,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.700", "gray.100");
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (_id) => {
    const data = await deleteProduct(_id);
    toast({
      title: data.success ? "Success" : "Error",
      description: data.message,
      status: data.success ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleUpdate = async (_id, updatedProduct) => {
    const data = await updateProduct(_id, updatedProduct);
    onClose();
    if (!data.success) {
      toast({
        title: "Error",
        description: 'Error updating product. Please try again.',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: 'Product updated successfully.',
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="full"
      maxW={{ base: "100%", sm: "320px" }}
      h="full"
      boxShadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
    >
      <Box
        position="relative"
        height={{ base: "200px", sm: "240px" }}
        overflow="hidden"
      >
        <Image
          src={product?.image || "/placeholder.jpg"}
          alt={product?.name || "Product"}
          objectFit="cover"
          w="100%"
          h="100%"
          fallback={<Box bg="gray.100" w="100%" h="100%" />}
        />
      </Box>

      <Stack spacing={4} p={{ base: 3, md: 4 }}>
        <Heading as="h3" fontSize={{ base: "md", md: "lg" }} noOfLines={2}>
          {product?.name || "Product Name"}
        </Heading>

        <Text
          fontWeight="bold"
          fontSize={{ base: "lg", md: "xl" }}
          textColor={textColor}
        >
          {product?.price || "$0.00"}
        </Text>

        <HStack spacing={2} pt={2}>
          <IconButton
            aria-label="Edit product"
            icon={<EditIcon />}
            colorScheme="blue"
            size={{ base: "sm", md: "md" }}
            onClick={onOpen}
          />
          <IconButton
            aria-label="Delete product"
            icon={<DeleteIcon />}
            colorScheme="red"
            size={{ base: "sm", md: "md" }}
            onClick={() => handleDelete(product._id)}
          />
        </HStack>
      </Stack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent mx={{ base: 4, md: 0 }}>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  name="name"
                  value={updatedProduct.name}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  name="image"
                  value={updatedProduct.image}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                  resize="vertical"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdate(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
