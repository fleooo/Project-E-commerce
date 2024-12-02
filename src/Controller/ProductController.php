<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/products', name: 'api_products_')]
class ProductController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', methods: ['GET'])]
    public function index(ProductRepository $repository): JsonResponse
    {
        return $this->json($repository->findAll());
    }

    #[Route('/', methods: ['POST'])]
    public function store(Request $request, SerializerInterface $serializer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $category = $this->entityManager->getRepository(Category::class)->find($data['category_id']);

        $product = new Product();
        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);
        $product->setCategory($category);

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        $json = $serializer->serialize($product, 'json', ['groups' => 'product:read']);

        return new JsonResponse($json, JsonResponse::HTTP_CREATED, [], true);
    }
    #[Route('/{id}', methods: ['PUT'])]
    public function update(
        int $id,
        Request $request,
        ProductRepository $repository,
        SerializerInterface $serializer
    ): JsonResponse {
        // Récupérer le produit par son ID
        $product = $repository->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Décoder les données de la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier et mettre à jour les champs
        if (isset($data['name'])) {
            $product->setName($data['name']);
        }

        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }

        if (isset($data['price'])) {
            $product->setPrice($data['price']);
        }

        if (isset($data['category_id'])) {
            $category = $this->entityManager->getRepository(Category::class)->find($data['category_id']);
            if (!$category) {
                return $this->json(['error' => 'Category not found'], JsonResponse::HTTP_BAD_REQUEST);
            }
            $product->setCategory($category);
        }

        // Sauvegarder les modifications
        $this->entityManager->flush();

        // Retourner le produit mis à jour
        $json = $serializer->serialize($product, 'json', ['groups' => 'product:read']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }
    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id, ProductRepository $repository): JsonResponse
    {
        // Récupérer le produit par son ID
        $product = $repository->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Supprimer le produit
        $this->entityManager->remove($product);
        $this->entityManager->flush();

        // Retourner une réponse
        return $this->json(['message' => 'Product deleted successfully'], JsonResponse::HTTP_NO_CONTENT);
    }
}
