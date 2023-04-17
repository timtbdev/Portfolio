import type { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  container: {
   
    backgroundColor: '#ffffff',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1200px 600px',
    backgroundPosition: 'top left',
    color: '#0f172a',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Plus Jakarta Sans"',
    fontWeight: 400,
    height: '100%',
    justifyContent: 'center',
    paddingBottom: 104,
    paddingLeft: 132,
    paddingRight: 132,
    position: 'relative',
    width: '100%',
  },
  category: {
    color: '#7733ff',
    fontSize: 36,
    fontWeight: 500,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  categoryWork: {
    color: '#3b82f6',
  },
  title: {
    color: '#334155',
    fontSize: 68,
    fontWeight: 500,
    lineHeight: 1.15,
    marginBottom: 28,
  },
  tags: {
    display: 'flex',
  },
  tag: {
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#dbeafe',
    color: '#2563eb',
    fontSize: 20,
    fontWeight: 400,
    display: 'flex',
    height: 48,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 20,
  },
  tagHash: {
    color: '#60a5fa',
    marginRight: 4,
  },
  author: {
    alignItems: 'center',
    bottom: 64,
    display: 'flex',
    left: 132,
    position: 'absolute',
    right: 132,
  },
  authorAvatar: {
    borderRadius: '100%',
    marginRight: 16,
  },
  divider: {
    color: '#475569',
    marginLeft: 8,
    marginRight: 8,
    fontSize: 24,
  },
  authorName: {
    color: '#334155',
    display: 'flex',
    fontSize: 26,
    fontWeight: 400,
  },
  description: {
    color: '#475569',
    fontSize: 26,
  },
  borderBottom: {
    backgroundColor: '#7733ff',
    bottom: 0,
    height: 12,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  borderBottomWork: {
    backgroundColor: '#3b82f6',
  },
};