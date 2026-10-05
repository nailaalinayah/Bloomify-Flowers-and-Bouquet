
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F9',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#D96F8C',
  },
  subtitle: {
    color: '#967681',
    fontSize: 12,
    marginTop: 3,
  },
  hero: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#FBE4EA',
    borderRadius: 22,
  },
  greeting: {
    color: '#743B4C',
    fontSize: 23,
    fontWeight: 'bold',
  },
  description: {
    color: '#80636B',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 14,
    borderRadius: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#F3DDE4',
  },
  searchInput: {
    flex: 1,
    marginLeft: 9,
    color: '#603743',
  },
  section: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#683646',
  },
  categories: {
    paddingHorizontal: 20,
    marginTop: 13,
    gap: 9,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0DCE2',
  },
  categoryActive: {
    backgroundColor: '#D96F8C',
    borderColor: '#D96F8C',
  },
  categoryText: {
    color: '#805261',
    fontSize: 12,
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 15,
    marginTop: 15,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F2E4E8',
  },
  productImage: {
    width: '100%',
    height: 145,
    backgroundColor: '#F5E6E9',
  },
  productInfo: {
    padding: 11,
  },
  productName: {
    color: '#633646',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productDescription: {
    color: '#98828A',
    fontSize: 11,
    marginTop: 5,
  },
  price: {
    color: '#D26382',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 9,
  },
  detailButton: {
    backgroundColor: '#D96F8C',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#967681',
    marginTop: 30,
    width: '100%',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
});
