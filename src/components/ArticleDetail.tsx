import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap"
import { type Article } from "../types/Article"

function ArticleDetail() {
  const params = useParams()
  const navigate = useNavigate()

  const [article, setArticle] = useState<Article>({
    id: 0,
    title: "",
    url: "",
    image_url: "",
    news_site: "",
    summary: "",
    published_at: "",
  })

  const [loading, setLoading] = useState(true)

  const fetchArticle = async () => {
    try {
      const res = await fetch(
        `https://api.spaceflightnewsapi.net/v4/articles/${params.id}`
      )

      if (res.ok) {
        const data = await res.json()
        setArticle(data)
        setLoading(false)
      } else {
        throw new Error("Errore nel caricamento del dettaglio articolo")
      }
    } catch (error) {
      console.log("Errore caricamento dettaglio:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p className="mt-3">Caricamento articolo...</p>
      </Container>
    )
  }

  return (
    <>
      <h1 className="text-center mt-3">Dettagli articolo</h1>

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Card className="shadow-lg">
              <Card.Img
                variant="top"
                src={article.image_url}
                alt={article.title}
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />

              <Card.Body>
                <Card.Title>{article.title}</Card.Title>

                <Card.Subtitle className="text-muted my-2">
                  Pubblicato il:{" "}
                  {new Date(article.published_at).toLocaleDateString()}
                </Card.Subtitle>

                <Card.Text className="m-0">
                  <span className="fw-bold">Fonte:</span> {article.news_site}
                </Card.Text>

                <Card.Text>
                  <span className="fw-bold">Riassunto:</span>
                  <br />
                  {article.summary}
                </Card.Text>

                <Button variant="primary" href={article.url} target="_blank">
                  Vai all’articolo originale
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="text-center">
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            className="mt-4"
          >
            Torna alla Home
          </Button>
        </div>
      </Container>
    </>
  )
}

export default ArticleDetail
