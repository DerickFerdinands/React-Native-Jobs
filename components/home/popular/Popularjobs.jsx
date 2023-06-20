import {useRouter} from "expo-router";
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View,} from "react-native";

import styles from "./popularjobs.style";
import {COLORS, SIZES} from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from '../../../hook/useFetch';
import {useState} from "react";

const Popularjobs = () => {

    const router = useRouter();

    const {data, isLoading, error} = useFetch('search',
        {
            query: 'React developer',
            page: '1',
            num_pages: '1'
        });

    const [selectedJob,setSelectedJob] = useState();

    const handleCardPress = (item)=>{
        router.push(`/job-details/${item.job_id}`);
        setSelectedJob(item.job_id)
    }

    console.log(data)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular Jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size={"large"} colors={COLORS.primary}/>
                ) : error ? (
                    <Text>Something Went Wrong</Text>
                ) : (
                    <FlatList data={data}
                              renderItem={({item}) => (
                                  <PopularJobCard
                                      item={item}
                                      selectedJob={selectedJob}
                                      handleCardPress={handleCardPress}
                                  />)}
                              keyExtractor={item => item?.job_id}
                              contentContainerStyle={{columnGap: SIZES.medium}}
                              horizontal
                    />
                )}
                {
                    console.log(error)
                }
            </View>
        </View>
    );
};

export default Popularjobs;
