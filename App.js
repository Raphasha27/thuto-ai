import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { Play, Pause, Volume2, MapPin, Brain, Sparkles } from 'lucide-react-native';
import { COLORS, GRADIENTS } from './src/theme';

const { width } = Dimensions.get('window');

const SOUND_CATEGORIES = [
  {
    id: 'rain',
    name: 'Rain',
    icon: '🌧️',
    color: '#38BDF8',
    description: 'Gentle rainfall',
    // In production, these would be actual audio files
    url: null
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: '🌊',
    color: '#0EA5E9',
    description: 'Waves crashing',
    url: null
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    color: '#34D399',
    description: 'Birds & wind',
    url: null
  },
  {
    id: 'cafe',
    name: 'Café',
    icon: '☕',
    color: '#F59E0B',
    description: 'Coffee shop ambiance',
    url: null
  },
  {
    id: 'whitenoise',
    name: 'White Noise',
    icon: '📻',
    color: '#94A3B8',
    description: 'Pure static',
    url: null
  },
  {
    id: 'fire',
    name: 'Fireplace',
    icon: '🔥',
    color: '#F59E0B',
    description: 'Crackling fire',
    url: null
  }
];

const SoundCard = ({ sound, isActive, volume, onToggle, onVolumeChange }) => (
  <View style={[styles.soundCard, isActive && styles.soundCardActive]}>
    <TouchableOpacity
      style={styles.soundCardContent}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <Text style={styles.soundIcon}>{sound.icon}</Text>
      <View style={styles.soundInfo}>
        <Text style={styles.soundName}>{sound.name}</Text>
        <Text style={styles.soundDesc}>{sound.description}</Text>
      </View>
      {isActive && (
        <View style={styles.volumeIndicator}>
          <Volume2 size={16} color={COLORS.primary} />
          <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
        </View>
      )}
    </TouchableOpacity>
    
    {isActive && (
      <View style={styles.volumeSlider}>
        <View style={styles.sliderTrack}>
          <View style={[styles.sliderFill, { width: `${volume * 100}%` }]} />
        </View>
      </View>
    )}
  </View>
);

export default function App() {
  const [activeSounds, setActiveSounds] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState('focus');
  const [aiSuggestion, setAiSuggestion] = useState(null);

  useEffect(() => {
    // Simulate AI suggestion based on time of day
    const hour = new Date().getHours();
    let suggestion;
    
    if (hour >= 6 && hour < 12) {
      suggestion = {
        mix: ['rain', 'cafe'],
        reason: 'Morning energy detected. Try gentle rain with café ambiance for focused start.',
        mood: 'Morning Focus'
      };
    } else if (hour >= 12 && hour < 18) {
      suggestion = {
        mix: ['whitenoise', 'forest'],
        reason: 'Afternoon productivity peak. White noise + nature sounds recommended.',
        mood: 'Deep Work'
      };
    } else {
      suggestion = {
        mix: ['ocean', 'fire'],
        reason: 'Evening wind-down. Ocean waves with fireplace for relaxation.',
        mood: 'Evening Calm'
      };
    }
    
    setAiSuggestion(suggestion);
  }, []);

  const toggleSound = (soundId) => {
    setActiveSounds(prev => ({
      ...prev,
      [soundId]: prev[soundId] ? null : { volume: 0.5 }
    }));
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const applySuggestion = () => {
    if (aiSuggestion) {
      const newActive = {};
      aiSuggestion.mix.forEach(soundId => {
        newActive[soundId] = { volume: 0.5 };
      });
      setActiveSounds(newActive);
      setCurrentMood(aiSuggestion.mood);
      setIsPlaying(true);
    }
  };

  const activeCount = Object.keys(activeSounds).filter(k => activeSounds[k]).length;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={GRADIENTS.dark} style={styles.background} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>SOUNDSCAPE<Text style={styles.titleAccent}>AI</Text></Text>
            <Text style={styles.subtitle}>Neural Audio Engine v2.0</Text>
          </View>
          <View style={styles.locationBadge}>
            <MapPin size={14} color={COLORS.primary} />
            <Text style={styles.locationText}>Home</Text>
          </View>
        </View>

        {/* AI Suggestion Card */}
        {aiSuggestion && (
          <View style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <Brain size={20} color={COLORS.accent} />
              <Text style={styles.aiTitle}>AI RECOMMENDATION</Text>
            </View>
            <Text style={styles.aiMood}>{aiSuggestion.mood}</Text>
            <Text style={styles.aiReason}>{aiSuggestion.reason}</Text>
            <TouchableOpacity style={styles.aiButton} onPress={applySuggestion}>
              <Sparkles size={16} color={COLORS.text} />
              <Text style={styles.aiButtonText}>Apply Neural Mix</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Current Mix Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>ACTIVE LAYERS</Text>
            <Text style={styles.statusValue}>{activeCount}/6</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>MOOD STATE</Text>
            <Text style={[styles.statusValue, { color: COLORS.accent }]}>{currentMood}</Text>
          </View>
        </View>

        {/* Sound Grid */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>SOUND LIBRARY</Text>
          {SOUND_CATEGORIES.map(sound => (
            <SoundCard
              key={sound.id}
              sound={sound}
              isActive={!!activeSounds[sound.id]}
              volume={activeSounds[sound.id]?.volume || 0.5}
              onToggle={() => toggleSound(sound.id)}
            />
          ))}
        </ScrollView>

        {/* Play Control */}
        <View style={styles.playControl}>
          <TouchableOpacity
            style={[styles.playButton, isPlaying && styles.playButtonActive]}
            onPress={handlePlayPause}
            activeOpacity={0.8}
          >
            {isPlaying ? (
              <Pause size={32} color={COLORS.text} />
            ) : (
              <Play size={32} color={COLORS.text} />
            )}
          </TouchableOpacity>
          <Text style={styles.playText}>
            {isPlaying ? 'SOUNDSCAPE ACTIVE' : 'TAP TO ACTIVATE'}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 2,
  },
  titleAccent: {
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginTop: 4,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  locationText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  aiCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.accent + '40',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiTitle: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 1,
  },
  aiMood: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  aiReason: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 12,
    lineHeight: 18,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 8,
  },
  aiButtonText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statusCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  soundCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  soundCardActive: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  soundCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  soundInfo: {
    flex: 1,
  },
  soundName: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  soundDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  volumeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeText: {
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  volumeSlider: {
    marginTop: 12,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#1E293B',
    borderRadius: 2,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  playControl: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  playButtonActive: {
    backgroundColor: COLORS.primary,
  },
  playText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
