import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const OnboardingScreen = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      id: 1,
      title: 'Tangara School Ruiru',
      description: '---Lead.Inspire.Win!---',
      image: require('../assets/logo.png'),
      backgroundColor:'#5fcf80'
    },
    {
      id: 2,
      title: 'Nurturing A Million Dreams.',
      description: 'Our school aspires to empower lifelong learners to acquire fundamental competencies and contribute to the global community through respect, inclusion and excellence.',
      image: require('../assets/logo.png'),
      backgroundColor:'#5fcf80'
    },
    
  ];

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      navigation.navigate('Login'); // Navigate to the Login screen when onboarding is completed
    }
  };
  

  const renderDots = () => {
    return slides.map((slide, index) => (
      <View
        key={slide.id}
        style={[styles.dot, index === activeSlide ? styles.activeDot : null]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/bg.jpg')} className="flex-1 absolute w-full h-full" blurRadius={60}/>
      <Image source={slides[activeSlide].image} style={styles.slideImage} />
      <Text style={styles.slideTitle}>{slides[activeSlide].title}</Text>
      <Text className="text-slate-100 mb-5 text-sm font-semibold" style={styles.slideDescription}>{slides[activeSlide].description}</Text>
      <View style={styles.loaderContainer}>
          <LottieView
            style={styles.loader}
            source={require('../anim.json')} // Replace with your own loader animation file
            autoPlay
            loop
          />
          
        </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {activeSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
      <View style={styles.dotsContainer}>{renderDots()}</View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  slideImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'#ffffff'
  },
  
  nextButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    width:'70%',
    alignItems:'center',
    borderRadius:15,
    marginTop:'10%',
    height:45,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    width: 100,
    height: 100,
    color:'white'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 30,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000000',
  },
});

export default OnboardingScreen;
