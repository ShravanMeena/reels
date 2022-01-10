import React, {useState, useRef} from 'react';

// import all the components we are going to use
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  View,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

//Import React Native Video to play video
import Video from 'react-native-video';

//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {heightToDp, widthToDp} from '../components/responsive';

const App = () => {
  const threshold = 350;

  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currIndex, setIndex] = useState(0);

  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('cover');
  const [currentPosition, setCurrentPosition] = useState({
    start: null,
    end: null,
  });

  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setIndex(currIndex + 1);
    alert("next")
  };

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const goFullScreen = () => {
    if (videoPlayer.current) {
      videoPlayer.current.presentFullscreenPlayer();
    }
  };

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    // goFullScreen()
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  const scrollHandler = event => {
    // alert("scroll")/
    const scrollPostion = event.nativeEvent.contentOffset.y;
    const {start, end} = currentPosition;

    // if (scrollPostion < start && scrollPostion > end ) {
    //   setPaused(false);
    //   console.log('1');
    // }
    if (scrollPostion > start && scrollPostion < end) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  };

  const onVideoLayout = event => {
    currentPosition.start = -(event.nativeEvent.layout.y - threshold / 2);
    currentPosition.end =
      event.nativeEvent.layout.y + event.nativeEvent.layout.height + threshold;
  };

  const onChangeIndex = ({index}) => {
    setIndex(index);
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable onPress={() => setPaused(!paused)} style={styles.playerBox}>
        <Video
          // onLayout={onVideoLayout}
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={index !== currIndex}
          controls
          ref={videoPlayer}
          resizeMode={screenType}
          onFullScreen={isFullScreen}
          source={{
            uri: item.uri,
          }}
          // source={require('../assets/yo.mp4')}
          style={styles.mediaPlayer}
          volume={10}
          // resizeMode="cover"
          muted={muted}
          repeat={true}
          poster="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/English_Cocker_Spaniel_4.jpg/800px-English_Cocker_Spaniel_4.jpg"
          posterResizeMode="cover"
        />
        {/* <MediaControls
      //     duration={duration}
      //     isLoading={isLoading}
      //     mainColor="#333"
      //     // onFullScreen={onFullScreen}
      //     // onPaused={onPaused}
      //     // onReplay={onReplay}
      //     onSeek={onSeek}
      //     onSeeking={onSeeking}
      //     playerState={playerState}
      //     progress={currentTime}
      //     toolbar={renderToolbar()}
      //   /> */}
        {/* </View> */}
      </Pressable>
    );
  };

  return (
      <SwiperFlatList
        onChangeIndex={onChangeIndex}
        // autoplay
        // autoplayDelay={2}
        // autoplayLoop
        index={currIndex}
        // showPagination
        vertical
        data={myData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
  );
};

export default App;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'red',
  },
  mediaPlayer: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // backgroundColor: 'black',
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  playerBox: {
    // marginBottom: heightToDp('100%'),
    // marginTop: heightToDp('100%'),
    flex: 1,
    width: widthToDp('100%'),
    height: heightToDp('100%') ,
  },
});

const myData = [
  {
    id: 1,
    uri: 'https://player.vimeo.com/external/484411825.sd.mp4?s=5e5ed4a2ae7e9c1a4195fcffa0f270896e0c79b6&profile_id=165&oauth2_token_id=57447761',
  },
  {
    id: 2,
    uri: 'https://player.vimeo.com/external/490354865.sd.mp4?s=b766187a429156ce9fddcbd669314da4daa9603b&profile_id=165&oauth2_token_id=57447761',
  },
  {
    id: 3,
    uri: 'https://player.vimeo.com/external/493876128.sd.mp4?s=89e2dfdee7ea4bd544b8652a32474672cb6565ff&profile_id=165&oauth2_token_id=57447761',
  },
  {
    id: 4,
    uri: 'https://player.vimeo.com/external/505970742.sd.mp4?s=8d9283c17d7ddd5e37eca259aba21b1e4fd990b8&profile_id=165&oauth2_token_id=57447761',
  },
  {
    id: 5,
    uri: 'https://player.vimeo.com/external/627451861.sd.mp4?s=5ecc9f69284031404a84c9fc79cbde7f5967b653&profile_id=165&oauth2_token_id=57447761',
  },
  {
    id: 6,
    uri: 'https://player.vimeo.com/external/570850079.sd.mp4?s=45ca46370ec2a65e3efba3ce27677c8205b95375&profile_id=165&oauth2_token_id=57447761',
  },
];
