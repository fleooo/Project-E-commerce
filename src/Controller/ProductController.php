<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use App\Repository\CategoryRepository;
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
    private SerializerInterface $serializer;

    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('/', methods: ['GET'])]
    public function index(ProductRepository $repository): JsonResponse
    {
        // Récupérer tous les produits
        $products = $repository->findAll();

        // Ajouter explicitement les catégories aux produits
        foreach ($products as $product) {
            $category = $product->getCategory(); // Récupérer la catégorie de chaque produit
            // S'assurer que la catégorie est incluse dans la sérialisation du produit
            $product->setCategory($category);
        }

        // Sérialiser les produits avec la catégorie
        $json = $this->serializer->serialize($products, 'json', ['groups' => 'product:read']);

        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/', methods: ['POST'])]
    public function store(Request $request, CategoryRepository $categoryRepository): JsonResponse
    {
        // Décodage des données JSON reçues
        $data = json_decode($request->getContent(), true);

        // Vérification de la catégorie
        $category = $categoryRepository->find($data['category_id']);
        if (!$category) {
            return new JsonResponse(['error' => 'Category not found'], 400);
        }

        // Création du produit
        $product = new Product();
        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);
        $product->setCategory($category);

        // Persist et sauvegarde du produit
        $this->entityManager->persist($product);
        $this->entityManager->flush();

        // Retourner le produit créé avec la catégorie sérialisée
        $json = $this->serializer->serialize($product, 'json', ['groups' => 'product:read']);

        return new JsonResponse($json, 201, [], true);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request, ProductRepository $productRepository, CategoryRepository $categoryRepository): JsonResponse
    {
        // Récupérer le produit à mettre à jour
        $product = $productRepository->find($id);
        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], 404);
        }

        // Décodage des données JSON reçues
        $data = json_decode($request->getContent(), true);

        // Mise à jour du produit
        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);

        // Mise à jour de la catégorie
        $category = $categoryRepository->find($data['category_id']);
        if ($category) {
            $product->setCategory($category);
        }

        // Enregistrer les modifications
        $this->entityManager->flush();

        // Sérialisation et retour du produit mis à jour
        $json = $this->serializer->serialize($product, 'json', ['groups' => 'product:read']);
        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id, ProductRepository $productRepository): JsonResponse
    {
        // Récupérer le produit à supprimer
        $product = $productRepository->find($id);
        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], 404);
        }

        // Supprimer le produit
        $this->entityManager->remove($product);
        $this->entityManager->flush();

        // Réponse après suppression
        return new JsonResponse(['message' => 'Product deleted successfully'], 200);
    }
}
