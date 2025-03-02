import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/ui/button";
import { useNavigation } from "@react-navigation/native";
import profile1 from "../../assets/images/Pro1.jpg"; 
import profile2 from "../../assets/images/pro2.jpg";  


const reviews = [
  {
    name: "Sana Liyanage",
    date: "12/11/2023",
    rating: 3,
    review:
      "Sigiriya left me in awe! Climbing the ancient fortress was thrilling, the frescoes were stunning, and the view from the summit was absolutely unforgettable. A true marvel!",
    profilePic: profile1, 
  },
  {
    name: "Mariyan John",
    date: "03/04/2021",
    rating: 2,
    review: "Exploring Sigiriya was like stepping into history.",
    profilePic: profile2, 
  },
];

const Review = () => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Reviews</Text>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingContainer}>
          {[...Array(4)].map((_, i) => (
            <FontAwesome key={i} name="star" size={20} color="gold" style={styles.star} />
          ))}
          <FontAwesome name="star-o" size={20} color="white" style={styles.star} />
          <Text style={styles.ratingText}>4.5</Text>
        </View>

        {/* Reviews List */}
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            {/* Star Ratings */}
            <View style={styles.stars1}>
              {[...Array(review.rating)].map((_, i) => (
                <FontAwesome key={i} name="star" size={18} color="gold" style={styles.star1} />
              ))}
              {[...Array(5 - review.rating)].map((_, i) => (
                <FontAwesome key={i} name="star-o" size={18} color="black" style={styles.star1} />
              ))}
            </View>
            
            {/* Review Text */}
            <Text style={styles.reviewText}>{review.review}</Text>
            
            {/* User Info */}
            <View style={styles.reviewHeader}>
              <Image 
                source={review.profilePic ? review.profilePic : defaultAvatar} 
                style={styles.profilePic} 
              />
              <View>
                <Text style={styles.name}>{review.name}</Text>
                <Text style={styles.date}>{review.date}</Text>
              </View>
            </View>
          </View>
        ))}

        

        {/* Footer Buttons */}
        <View style={styles.footer}>
  <Button style={[styles.button, styles.button1]}>
    <FontAwesome name="map" size={20} color="#5ae1ff" /> 
    <Text style={styles.buttonText}> Site Map</Text> 
  </Button>
  <Button style={[styles.button, styles.uploadButton]}><Text style={styles.buttonText1}> Upload 
    Photos</Text></Button>
</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#021f2b", flex: 1, padding: 13.5 },
  header: { flexDirection: "column", alignItems: "center", marginBottom: 16 },
  headerText: { color: "white", fontSize: 18, marginTop: 20, marginLeft:-280 },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  ratingText: { color: "white", fontSize: 25, marginLeft: 119 },
  reviewCard: { backgroundColor: "#08354c", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#ffffff", marginBottom: 19 },
  reviewHeader: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight:15 },
  name: { color: "white", fontWeight: "bold" },
  date: { color: "gray", fontSize: 12 },
  stars: { flexDirection: "row", marginBottom: 8 },
  star: { marginRight: 20 }, 
  button1: { backgroundColor: "#021f2b", borderWidth: 1, borderColor: "#66dbfe" },

  reviewText: { 
    color: "white", 
    marginBottom: 25, 
    marginTop: 20, 
    width: "80%", 
    alignSelf: "center", 
    textAlign: "justify" 
  },
  footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: { backgroundColor: "#555", flex: 1, marginRight: 8 },
  uploadButton: { backgroundColor: "#5ddefe"},
  backButton: { padding: 5, marginRight: 320 },
  stars1: { flexDirection: "row", marginBottom: 8 },
  star1: { marginRight: 8 },
  buttonText: { 
    color: "#61dffe", 
    fontSize: 16, 
    marginLeft: 8 
  },
  buttonText1: {
    color: "#021f2b"
  }
  
});

export default Review;