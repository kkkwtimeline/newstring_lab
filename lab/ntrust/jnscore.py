def byline_score():
    pass


# 기사의 길이 (분류, 매체유형에 따라 다름)
def content_len_score(contentLength, avg, sd):
    if contentLength <= avg:
        return 0
    if contentLength <= avg + 0.5 * sd:
        return 0.165
    elif contentLength <= avg + sd:
        return 0.33
    elif contentLength <= avg + 1.5 * sd:
        return 0.495
    elif contentLength <= avg + 2.0 * sd:
        return 0.66
    elif contentLength <= avg + 2.5 * sd:
        return 0.835
    else:
        return 1


# 인용문의 수
def num_quotes_score(numQuotes):

    return numQuotes / 15 if numQuotes < 15 else 1


# 제목의 길이
def title_len_score(lenTitle):
    return 0 if lenTitle <= 45 else -1


# 제목에 물음표/느낌표
def num_title_puncs_score(numTitlePuncs):
    if numTitlePuncs == 0:
        return 0
    elif numTitlePuncs == 1:
        return -0.5
    else:
        return -1


# 수치 인용 수
def num_numberts_score(numNumbers, avg, sd):
    if numNumbers < avg:
        return 0
    elif numNumbers < (avg + 0.5 * sd):
        return 0.33
    elif numNumbers < (avg + sd):
        return 0.66
    else:
        return 1


# 이미지의 수
def image_count_score(imageCount):
    if imageCount <= 0:
        return 0
    elif imageCount == 1:
        return 0.33
    elif imageCount == 2:
        return 0.66
    elif imageCount == 3:
        return 1
    elif imageCount == 4:
        return 0.66
    elif imageCount == 5:
        return 0.33
    else:  # imageCount >= 6:
        return 0


# 평균 문장 길이
def avg_sentence_len_score(avgSentenceLength, avg, sd):
    return -1 if avgSentenceLength >= (avg + sd) else 0


# 제목의 부사수
def title_adverb_count_score(numTitleAdverbs):
    if numTitleAdverbs == 1:
        return -0.5
    elif numTitleAdverbs >= 2:
        return -1
    else:
        return 0


# 문장당 평균 부사수
def avg_adverb_cps_score(avgAdverbsPerSentence, avg, sd):
    return -1 if avgAdverbsPerSentence >= (avg + 2 * sd) else 0


# 인용문 길이 비율
def quote_percent_score(quotePercent):
    if quotePercent < 0.5:
        return 0
    elif quotePercent < 0.8:
        return -0.5
    else:
        return -1


score_byline = byline_score()
score_contentLength = content_len_score()
score_quoteCount = num_quotes_score()
score_titleLength = title_len_score()
score_titlePuncCount = num_title_puncs_score()
score_numberCount = num_title_puncs_score()
score_imageCount = image_count_score()
score_avgSentenceLength = avg_sentence_len_score()
score_titleAdverbCount = title_adverb_count_score()
score_avgAdverbCountPerSentence = avg_adverb_cps_score()
score_quotePercent = quote_percent_score()


# 독이성
journal_read = score_byline * 0.001 \
    + score_contentLength * 0.003 \
    + score_quoteCount * 0.001 \
    + score_titleLength * 1 \
    + score_titlePuncCount * 1.002 \
    + score_numberCount * 1.354 \
    + score_imageCount * 1.5 \
    + score_avgSentenceLength * 1.5 \
    + score_titleAdverbCount * 2.466 \
    + score_avgAdverbCountPerSentence * 0.5
# 투명성
journal_clear = score_byline * 4.498 \
    + score_contentLength * 3.003 \
    + score_quoteCount * 4.5 \
    + score_titlePuncCount * 3.619 \
    + score_numberCount * 1.454 \
    + score_imageCount * 1 \
    + score_quotePercent * 0.001
# 사실성
journal_truth = score_byline * 4.493 \
    + score_contentLength * 3.503 \
    + score_quoteCount * 3.501 \
    + score_titlePuncCount * 0.001 \
    + score_numberCount * 0.502 \
    + score_imageCount * 1.5 \
    + score_titleAdverbCount * 0.5 \
    + score_avgAdverbCountPerSentence * 1.5 \
    + score_quotePercent * 1
# 유용성
journal_useful = score_byline * 3.494 \
    + score_contentLength * 3.498 \
    + score_quoteCount * 2.001 \
    + score_numberCount * 1.956 \
    + score_imageCount * 1
# 균형성
journal_balance = score_byline * 2.996 \
    + score_contentLength * 3.002 \
    + score_quoteCount * 3 \
    + score_titlePuncCount * 1.501 \
    + score_titleAdverbCount * 0.501 \
    + score_avgAdverbCountPerSentence * 1 \
    + score_quotePercent * 1 \
    # 다양성
journal_variety = score_byline * 0.998 \
    + score_contentLength * 4.994 \
    + score_quoteCount * 2.501 \
    + score_titleLength * 0.5 \
    + score_numberCount * 1.953 \
    + score_imageCount * 1 \
    + score_avgSentenceLength * 0.5 \
    + score_quotePercent * 0.5
# 독창성
journal_original = score_byline * 4.494 \
    + score_contentLength * 4.492 \
    + score_quoteCount * 3.501 \
    + score_titlePuncCount * 3.09 \
    + score_numberCount * 1.823 \
    + score_imageCount * 1.501
# 중요성
journal_important = score_byline * 2.495 \
    + score_contentLength * 3.503 \
    + score_quoteCount * 3.5 \
    + score_numberCount * 1.002 \
    + score_imageCount * 0.5
# 심층성
journal_deep = score_byline * 4.496 \
    + score_contentLength * 4.995 \
    + score_quoteCount * 3.501 \
    + score_numberCount * 1.336 \
    + score_imageCount * 1 \
    + score_quotePercent * 1
# 선정성
journal_yellow = score_byline * 4.491 \
    + score_titleLength * 3.5 \
    + score_titlePuncCount * 3.501 \
    + score_titleAdverbCount * 3.5 \
    + score_avgAdverbCountPerSentence * 3.5 \
    + score_quotePercent * 3.5

journalSum = journal_read + journal_clear + journal_truth + journal_useful + journal_balance \
    + journal_variety + journal_original + \
    journal_important + journal_deep + journal_yellow
