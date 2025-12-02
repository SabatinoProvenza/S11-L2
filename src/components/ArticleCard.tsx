import { type Article } from "../types/Article"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

interface ArticleCardProps {
  article: Article
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="mb-4 shadow-sm h-100">
      <Card.Img
        variant="top"
        src={article.image_url}
        alt={article.title}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{article.title}</Card.Title>

        <Card.Text className="flex-grow-1">{article.summary}</Card.Text>

        <Link to={`/articles/${article.id}`}>
          <Button variant="primary" className="w-50">
            Leggi di più
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default ArticleCard
