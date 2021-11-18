import { StarIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Badge, Box } from "@chakra-ui/layout";

export default function Item(props) {
	console.log(props)
  const item = props.item;
  console.log(item.rental_min, item.stock);
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={item.imageUrl} alt={item.imageAlt} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {item.rental_min} min rental &bull; {item.stock} available
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {item.title}
        </Box>

        <Box>
          {item.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < item.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {item.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
