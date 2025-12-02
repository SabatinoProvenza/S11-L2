import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { type Article } from "../types/Article";
import  ArticleCard  from "../components/ArticleCard";

 function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);


 const fetchArticles = async () => {
    try {
      const res = await fetch("https://api.spaceflightnewsapi.net/v4/articles");
      if (res.ok) {
        const data = await res.json();
      setArticles(data.results);
      setLoading(false);
      } else{
        throw new Error ("Errore nel caricamento dei dati")
      }
      
    } catch (error) {
      console.log("Errore fetch articoli:", error);
      setLoading(false);
    } 
}
  useEffect(() => {
    fetchArticles()
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Caricamento articoli...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4"> Spaceflight News</h1>

      <Row >
        {articles.map((article) => (
          <Col key={article.id} xs={12} md={6} lg={4} className="my-3">
            <ArticleCard article={article} />
          </Col>
        ))}
      </Row>
    </Container>
  );
 }

export default HomePage