from app import mongo

def insert_confessions(status_id='', status_message='', link_name='', status_type='', status_link='', \
                        status_published='', num_reactions=0, num_comments=0, num_shares=0, num_likes=0, \
                        num_loves=0, num_wows=0, num_hahas=0, num_sads=0, num_angrys=0):
    mongo.db.confessions.insert({
        '_id': ObjectId(),
        'status_id': str(status_id),
        'status_message': str(status_message),
        'link_name': str(link_name),
        'status_type': str(status_type),
        'status_link': str(status_link),
        'status_published': str(status_published),
        'num_reactions': int(num_reactions),
        'num_comments': int(num_comments),
        'num_shares': int(num_shares),
        'num_likes': int(num_likes),
        'num_loves': int(num_loves),
        'num_wows': int(num_wows),
        'num_hahas': int(num_hahas),
        'num_sads': int(num_sads),
        'num_angrys': int(num_angrys)
    })
