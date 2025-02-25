import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#F8F3E3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  flatListCenteredContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#FFF',
    position: 'absolute',
    right: 20,
    bottom: 50,
    transform: [{ translateY: -20 }],
    backgroundColor: '#30449B',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  cartBadge: {
    position: 'absolute',
    top: 1,
    right: 4,
    backgroundColor: '#FFC30E',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: RFValue(16),
    color: '#555',
  },
})

export default styles
