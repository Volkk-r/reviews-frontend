import { useState } from 'react';
import styled from '@emotion/styled';

interface Apartment {
  id: number;
  title: string;
  city: string;
  address: string;
  imageUrl: string;
  rating: string;
  reviewsCount: number;
  description: string;
}

const apartments: Apartment[] = [
  {
    id: 1,
    title: 'Светлая квартира у набережной',
    city: 'Ярославль',
    address: 'Волжская набережная, 12',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    rating: '4.4',
    reviewsCount: 18,
    description: 'Спокойный отдых рядом с главными прогулочными маршрутами города. Всё необходимое для комфортной поездки уже под рукой.',
  },
  {
    id: 2,
    title: 'Уютная студия в центре',
    city: 'Ярославль',
    address: 'ул. Кирова, 8',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85',
    rating: '4.8',
    reviewsCount: 3,
    description: 'Небольшая светлая студия в самом центре: уютный интерьер, кафе и городские маршруты в нескольких шагах.',
  },
  {
    id: 3,
    title: 'Квартира с видом на парк',
    city: 'Ярославль',
    address: 'ул. Свободы, 41',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    rating: '—',
    reviewsCount: 0,
    description: 'Тихая квартира с видом на зелёный парк — место, где приятно замедлиться после насыщенного дня.',
  },
];

const Page = styled.div`min-height:100vh;background:#f7f8fa;color:#202633;`;
const Header = styled.header`height:76px;background:rgba(255,255,255,.92);border-bottom:1px solid #eceef2;display:flex;align-items:center;`;
const HeaderInner = styled.div`width:min(1120px,calc(100% - 48px));margin:auto;display:flex;align-items:center;justify-content:space-between;`;
const Brand = styled.a`display:flex;align-items:center;gap:11px;text-decoration:none;color:#202633;font-weight:800;letter-spacing:-.04em;font-size:21px;`;
const Logo = styled.span`width:36px;height:36px;border-radius:13px;background:#675be2;color:white;display:grid;place-items:center;font-size:19px;box-shadow:0 6px 16px #675be244;`;
const LoginLabel = styled.span`padding:10px 14px;color:#4f46c8;font-size:14px;font-weight:700;`;
const Main = styled.main`width:min(1120px,calc(100% - 48px));margin:0 auto;padding:34px 0 80px;@media(max-width:600px){width:calc(100% - 32px);padding-top:24px}`;
const Breadcrumb = styled.div`font-size:13px;color:#858d99;margin-bottom:24px;`;
const Hero = styled.section`display:grid;grid-template-columns:1.07fr .93fr;gap:32px;align-items:center;margin:0 0 36px;@media(max-width:760px){grid-template-columns:1fr;gap:20px}`;
const HeroCopy = styled.div`padding:16px 0;`;
const Eyebrow = styled.div`font-size:11px;text-transform:uppercase;letter-spacing:.13em;font-weight:800;color:#7469db;margin-bottom:9px;`;
const Title = styled.h1`font-size:clamp(29px,4vw,42px);letter-spacing:-.055em;line-height:1.12;margin:0 0 12px;`;
const Subline = styled.p`margin:0;color:#687281;font-size:15px;display:flex;align-items:center;gap:8px;`;
const RatingLine = styled.div`display:flex;align-items:center;gap:8px;margin-top:19px;font-size:14px;`;
const RatingNumber = styled.strong`font-size:20px;letter-spacing:-.04em;`;
const Star = styled.span`color:#efa936;font-size:18px;`;
const Description = styled.p`max-width:490px;color:#687281;line-height:1.7;margin:14px 0 0;font-size:15px;`;
const HeroImage = styled.div<{ imageUrl: string }>`height:315px;border-radius:26px;background:linear-gradient(180deg,transparent 55%,rgba(22,27,34,.12)),url(${p=>p.imageUrl}) center/cover,#e6e4df;box-shadow:0 18px 48px rgba(29,36,48,.13);@media(max-width:760px){height:250px}@media(max-width:480px){height:210px}`;
const Picker = styled.section``;
const SectionHeading = styled.div`display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;`;
const SectionTitle = styled.h2`font-size:21px;letter-spacing:-.04em;margin:0;`;
const Count = styled.span`font-size:13px;color:#858d99;`;
const ApartmentList = styled.div`display:grid;grid-template-columns:repeat(3,1fr);gap:13px;@media(max-width:700px){grid-template-columns:1fr}`;
const ApartmentButton = styled.button<{ active: boolean }>`display:flex;align-items:center;gap:13px;text-align:left;background:${p=>p.active?'#fff':'rgba(255,255,255,.6)'};border:1px solid ${p=>p.active?'#8b80ed':'#e7e9ed'};box-shadow:${p=>p.active?'0 8px 24px rgba(48,42,120,.08)':'none'};border-radius:17px;padding:10px;cursor:pointer;transition:.18s ease;&:hover{transform:translateY(-2px);border-color:#aa9ff3}&:focus-visible{outline:3px solid #bdb6ff;outline-offset:2px}`;
const Thumbnail = styled.div<{ imageUrl: string }>`width:74px;height:68px;flex:none;border-radius:12px;background:url(${p=>p.imageUrl}) center/cover,#e7e5e0;`;
const ApartmentTitle = styled.span`display:block;font-weight:750;font-size:13px;line-height:1.35;color:#28303c;margin-bottom:6px;`;
const ApartmentMeta = styled.span`display:block;color:#818996;font-size:12px;`;

export default function App() {
  const [selectedApartmentId, setSelectedApartmentId] = useState(apartments[0].id);
  const selectedApartment = apartments.find(apartment => apartment.id === selectedApartmentId) ?? apartments[0];

  return (
    <Page>
      <Header>
        <HeaderInner>
          <Brand href="#"><Logo aria-hidden="true">⌂</Logo>stayfeel</Brand>
          <LoginLabel>Войти ↗</LoginLabel>
        </HeaderInner>
      </Header>
      <Main>
        <Breadcrumb>Ярославль&nbsp; / &nbsp;Квартиры&nbsp; / &nbsp;Отзывы гостей</Breadcrumb>
        <Hero>
          <HeroCopy>
            <Eyebrow>Подборка квартир · Ярославль</Eyebrow>
            <Title>{selectedApartment.title}</Title>
            <Subline>⌖ {selectedApartment.city}, {selectedApartment.address}</Subline>
            <RatingLine>
              <Star aria-hidden="true">★</Star>
              <RatingNumber>{selectedApartment.rating}</RatingNumber>
              <span style={{ color: '#b0b4bd' }}>·</span>
              <span style={{ color: '#707987' }}>{selectedApartment.reviewsCount} {plural(selectedApartment.reviewsCount)}</span>
            </RatingLine>
            <Description>{selectedApartment.description}</Description>
          </HeroCopy>
          <HeroImage role="img" aria-label={selectedApartment.title} imageUrl={selectedApartment.imageUrl} />
        </Hero>
        <Picker aria-labelledby="apartment-picker-title">
          <SectionHeading>
            <SectionTitle id="apartment-picker-title">Выберите квартиру</SectionTitle>
            <Count>{apartments.length} варианта</Count>
          </SectionHeading>
          <ApartmentList>
            {apartments.map(apartment => (
              <ApartmentButton
                type="button"
                key={apartment.id}
                active={apartment.id === selectedApartmentId}
                aria-pressed={apartment.id === selectedApartmentId}
                onClick={() => setSelectedApartmentId(apartment.id)}
              >
                <Thumbnail imageUrl={apartment.imageUrl} />
                <span>
                  <ApartmentTitle>{apartment.title}</ApartmentTitle>
                  <ApartmentMeta>{apartment.city} · {apartment.reviewsCount} {plural(apartment.reviewsCount)}</ApartmentMeta>
                </span>
              </ApartmentButton>
            ))}
          </ApartmentList>
        </Picker>
      </Main>
    </Page>
  );
}

function plural(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return 'отзыв';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'отзыва';
  return 'отзывов';
}
