<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/categories', name: 'api_categories_')]
class CategoryController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', methods: ['GET'])]
    public function index(CategoryRepository $repository, SerializerInterface $serializer): JsonResponse
    {
        // Récupérer toutes les catégories sans les produits associés
        $categories = $repository->findAll();

        // Sérialiser les catégories sans la relation produits
        $json = $serializer->serialize($categories, 'json', ['groups' => 'category:read']);

        // Retourner la réponse JSON sans les produits associés
        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/', methods: ['POST'])]
    public function store(Request $request): JsonResponse
    {
        // Récupérer les données envoyées dans la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier que les données sont valides
        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Vérifier que le champ 'name' est présent
        if (empty($data['name'])) {
            return $this->json(['error' => 'Missing category name'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Créer la nouvelle catégorie
        $category = new Category();
        $category->setName($data['name']);

        // Persister la catégorie dans la base de données
        $this->entityManager->persist($category);
        $this->entityManager->flush();

        // Retourner une réponse avec la catégorie créée
        return $this->json($category, JsonResponse::HTTP_CREATED, [], ['groups' => 'category:read']);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request, CategoryRepository $repository): JsonResponse
    {
        $category = $repository->find($id);

        if (!$category) {
            return $this->json(['error' => 'Category not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $category->setName($data['name']);
        }

        $this->entityManager->flush();

        return $this->json($category, JsonResponse::HTTP_OK, [], ['groups' => 'category:read']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id, CategoryRepository $repository): JsonResponse
    {
        $category = $repository->find($id);

        if (!$category) {
            return $this->json(['error' => 'Category not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($category);
        $this->entityManager->flush();

        return $this->json(['message' => 'Category deleted successfully'], JsonResponse::HTTP_NO_CONTENT);
    }
}
