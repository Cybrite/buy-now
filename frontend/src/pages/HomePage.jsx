import { Container, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { products, isLoading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <Container centerContent py={8}>
        <Text fontSize="xl">Loading...</Text>
      </Container>
    );
  }

  return (
    <Box minH="100vh" bg="gray.800">
      <Container
        maxW={{ base: "container.sm", md: "container.md", lg: "container.xl" }}
        py={{ base: 6, md: 8, lg: 12 }}
        px={{ base: 4, md: 6, lg: 8 }}
      >
        <VStack spacing={{ base: 6, md: 8, lg: 10 }} w="full">
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
            textAlign="center"
            px={4}
          >
            Current Products in the store✈️
          </Text>

          {products && products.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, sm: 2, lg: 3 }}
              spacing={{ base: 4, md: 6, lg: 8 }}
              w="full"
              px={{ base: 2, md: 0 }}
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={{ base: 8, md: 12 }} px={4}>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                color="gray.500"
              >
                Nothing Here😭!{" "}
                <Text
                  as="span"
                  color="blue.500"
                  _hover={{
                    textDecoration: "underline",
                    color: "blue.600",
                  }}
                  transition="all 0.2s"
                >
                  <Link to="/create">Create a new product</Link>
                </Text>
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default HomePage;
