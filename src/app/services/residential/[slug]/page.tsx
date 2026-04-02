import { notFound } from 'next/navigation';
import { getResidentialServiceBySlug, getResidentialServiceSlugs } from '@/data/residentialServices';
import ResidentialServiceDetail from '@/components/services/ResidentialServiceDetail';
import MasterBedroomPage from '@/components/services/MasterBedroomPage';
import HomeLibraryPage from '@/components/services/HomeLibraryPage';
import LandscapeDesignPage from '@/components/services/LandscapeDesignPage';
import HomeFurniturePage from '@/components/services/HomeFurniturePage';
import BungalowPage from '@/components/services/BungalowPage';
import ChilekothaPage from '@/components/services/ChilekothaPage';
import ThreeBedroomFlatPage from '@/components/services/ThreeBedroomFlatPage';
import CondoDesignPage from '@/components/services/CondoDesignPage';
import HomeGymDesignPage from '@/components/services/HomeGymDesignPage';
import SmallBedroomPage from '@/components/services/SmallBedroomPage';
import BedroomWallPage from '@/components/services/BedroomWallPage';
import WoodenHousePage from '@/components/services/WoodenHousePage';
import LoftInteriorDesignPage from '@/components/services/LoftInteriorDesignPage';
import HomeDecorProductsPage from '@/components/services/HomeDecorProductsPage';
import StudioApartmentPage from '@/components/services/StudioApartmentPage';
import ApartmentExteriorDesignPage from '@/components/services/ApartmentExteriorDesignPage';
import VillaExteriorDesignPage from '@/components/services/VillaExteriorDesignPage';
import DrawingRoomPage from '@/components/services/DrawingRoomPage';
import ChildBedroomPage from '@/components/services/ChildBedroomPage';
import LivingRoomPage from '@/components/services/LivingRoomPage';
import ApartmentPage from '@/components/services/ApartmentPage';
import VillaDesignPage from '@/components/services/VillaDesignPage';
import LivingSpaceDesignPage from '@/components/services/LivingSpaceDesignPage';
import DuplexInteriorPage from '@/components/services/DuplexInteriorPage';
import DiningRoomPage from '@/components/services/DiningRoomPage';
import StudyUnitPage from '@/components/services/StudyUnitPage';
import BathroomPage from '@/components/services/BathroomPage';
import VillageHousePage from '@/components/services/VillageHousePage';
import WallCabinetPage from '@/components/services/WallCabinetPage';
import VirtualPage from '@/components/services/VirtualPage';
import GamingRoomPage from '@/components/services/GamingRoomPage';
import KidsFurnitureDesignPage from '@/components/services/KidsFurnitureDesignPage';
import BedroomWallPaintPage from '@/components/services/BedroomWallPaintPage';
import BuildingDesignPage from '@/components/services/BuildingDesignPage';

interface ResidentialServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ResidentialServicePage({ params }: ResidentialServicePageProps) {
  const { slug } = await params;
  const service = getResidentialServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  
  if (slug === 'master-bedroom') {
    return <MasterBedroomPage service={service} />;
  }

  
  if (slug === 'home-library') {
    return <HomeLibraryPage service={service} />;
  }

  
  if (slug === 'landscape-design') {
    return <LandscapeDesignPage service={service} />;
  }

  
  if (slug === 'home-furniture') {
    return <HomeFurniturePage service={service} />;
  }

  
  if (slug === 'bungalow') {
    return <BungalowPage service={service} />;
  }

  
  if (slug === 'chilekotha') {
    return <ChilekothaPage service={service} />;
  }

  
  if (slug === '3-bedroom-flat-interior-design') {
    return <ThreeBedroomFlatPage service={service} />;
  }

  
  if (slug === 'condo-design') {
    return <CondoDesignPage service={service} />;
  }

  
  if (slug === 'home-gym-design') {
    return <HomeGymDesignPage service={service} />;
  }

  
  if (slug === 'small-bedroom') {
    return <SmallBedroomPage service={service} />;
  }

  
  if (slug === 'bedroom-wall') {
    return <BedroomWallPage service={service} />;
  }

  
  if (slug === 'wooden-house') {
    return <WoodenHousePage service={service} />;
  }

  
  if (slug === 'loft-interior-design') {
    return <LoftInteriorDesignPage service={service} />;
  }

  
  if (slug === 'home-decor-products') {
    return <HomeDecorProductsPage service={service} />;
  }

  
  if (slug === 'studio-apartment') {
    return <StudioApartmentPage service={service} />;
  }

  
  if (slug === 'apartment-exterior-design') {
    return <ApartmentExteriorDesignPage service={service} />;
  }

  
  if (slug === 'villa-exterior-design') {
    return <VillaExteriorDesignPage service={service} />;
  }

  
  if (slug === 'drawing-room') {
    return <DrawingRoomPage service={service} />;
  }

  
  if (slug === 'child-bedroom') {
    return <ChildBedroomPage service={service} />;
  }

  
  if (slug === 'living-room') {
    return <LivingRoomPage service={service} />;
  }

  
  if (slug === 'apartment') {
    return <ApartmentPage service={service} />;
  }

  
  if (slug === 'villa-design') {
    return <VillaDesignPage service={service} />;
  }

  
  if (slug === 'living-space-design') {
    return <LivingSpaceDesignPage service={service} />;
  }

  
  if (slug === 'duplex-interior') {
    return <DuplexInteriorPage service={service} />;
  }

  
  if (slug === 'dining-room') {
    return <DiningRoomPage service={service} />;
  }

  
  if (slug === 'study-unit') {
    return <StudyUnitPage service={service} />;
  }

  
  if (slug === 'bathroom') {
    return <BathroomPage service={service} />;
  }

  
  if (slug === 'village-house') {
    return <VillageHousePage service={service} />;
  }

  
  if (slug === 'wall-cabinet') {
    return <WallCabinetPage service={service} />;
  }

  
  if (slug === 'virtual') {
    return <VirtualPage service={service} />;
  }

  
  if (slug === 'gaming-room') {
    return <GamingRoomPage service={service} />;
  }

  
  if (slug === 'kids-furniture-design') {
    return <KidsFurnitureDesignPage service={service} />;
  }

  
  if (slug === 'bedroom-wall-paint') {
    return <BedroomWallPaintPage service={service} />;
  }

  
  if (slug === 'building-design') {
    return <BuildingDesignPage service={service} />;
  }

  return (
    <div className="pt-20">
      <ResidentialServiceDetail service={service} />
    </div>
  );
}

export async function generateStaticParams() {
  return getResidentialServiceSlugs().map((slug) => ({
    slug,
  }));
}
